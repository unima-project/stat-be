import React from 'react';
import {CorpusList} from "./Corpus";
import Box from '@mui/material/Box';
import {DeleteCorpus, GetCorpusList} from "../../models";
import {useNavigate} from "react-router-dom";
import {AlertNotification, alertSeverity} from "../commons/Alert";
import {SetupCookies} from "../../Helpers/cookie";

export const Corpus = (props) => {
    const navigate = useNavigate();
    const [corpusList, setCorpusList] = React.useState([]);
    const {cookieUserToken, cookie} = SetupCookies();
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });

    React.useEffect(() => {
        if (!cookieUserToken) navigate("/");
        GetCorpus();
    }, [cookieUserToken])

    const GetCorpus = () => {
        GetCorpusList(cookieUserToken)
            .then((data) => {
                setCorpusList(data.data);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
    }

    const DeleteCurrentCorpus = (corpus_id) => {
        DeleteCorpus(corpus_id, cookie.token)
            .then(data => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: `${data.message}`
                })
                GetCorpus();
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
    }

    return (<Box>
        <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
        <CorpusList
            corpusList={corpusList}
            deleteCurrentCorpus={DeleteCurrentCorpus}
            loadCurrentCorpus={props.loadCurrentCorpus}
            handleModalClose={props.handleModalClose}
            setConfirmationConfig = {props.setConfirmationConfig}
        />
    </Box>);
}