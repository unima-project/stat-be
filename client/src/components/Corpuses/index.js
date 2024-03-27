import React from 'react';
import {CorpusList} from "./Corpus";
import Box from '@mui/material/Box';
import {DeleteCorpus, GetCorpusList, GetPublicCorpusList, UpdateCorpusPublicStatus} from "../../models";
import {AlertNotification, alertSeverity} from "../commons/Alert";
import {SetupCookies} from "../../Helpers/cookie";
import {UserProfile} from "../../Helpers/userProfile"

export const Corpus = (props) => {
    const [corpusList, setCorpusList] = React.useState([]);
    const {cookie} = SetupCookies();
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const {isMember} = UserProfile();

    React.useEffect(() => {
        GetCorpus();

        const interval = setupGetCorpusInterval()
        if (props.alertStatus) {
            setAlertStatus(props.alertStatus);
        }

        return () => {
            clearInterval(interval);
        }
    }, [cookie, isMember, props.alertStatus])

    const setupGetCorpusInterval = () => {
        return setInterval(() => {
            GetCorpus();
        }, 5000);
    }

    const GetCorpus = () => {
        if (isMember) {
            GetAllCorpus();
        } else {
            GetPublicCorpus();
        }
    }

    const GetAllCorpus = () => {
        GetCorpusList(cookie.token)
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

    const GetPublicCorpus = () => {
        GetPublicCorpusList()
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

    const UpdateCurrentCorpus = (corpus) => {
        UpdateCorpusPublicStatus(corpus, cookie.token)
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
            setConfirmationConfig={props.setConfirmationConfig}
            updateCurrentCorpus={UpdateCurrentCorpus}
            isMember={isMember}
        />
    </Box>);
}