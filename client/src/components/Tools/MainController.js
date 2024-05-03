import React from 'react';
import Box from "@mui/system/Box";
import {SaveCorpus} from "../../models";
import {AlertNotification} from "../commons/Alert";
import {InputController} from "./InputController";
import {alertSeverity} from "../commons/Alert";

const MainController = (props) => {
    const [fileName, setFileName] = React.useState("")
    const [saveStatus, setSaveStatus] = React.useState(false);

    const resetState = () => {
        setFileName("");
        props.setKeyword("");
        props.setLoading(false);
    }

    const saveCorpus = () => {
        props.setLoading(true);

        SaveCorpus(props.text, props.cookie.token)
            .then(data => {
                props.setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: `save corpus: ${data.message}`
                })
            })
            .catch(error => {
                props.setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `save corpus: ${error}`
                })
            })
            .finally(() => {
                props.setLoading(false);
                setSaveStatus(false);
            })
    }

    const handleReveal = (text) => {
        props.setLoading(true);
        props.setAlertStatus({
            severity: alertSeverity.INFO
            , message: ""
        })

        props.getTokenList(text)
            .then(() => {
                setSaveStatus(true);
            })
            .finally(() => {
                resetState();
            })
    }

    const handleTextChange = (event) => {
        props.setText(event.target.value)
    }

    const loadCurrentCorpus = (corpus_id, isDownload, userId) => {
        props.loadCurrentCorpus(corpus_id, isDownload, userId);
        setSaveStatus(false);
    }

    const handleUpload = (event) => {
        props.setLoading(true);
        props.setAlertStatus({
            severity: alertSeverity.INFO
            , message: ""
        })

        if (event.target.files.length <= 0) {
            return
        }

        setFileName(event.target.files[0].name)

        const file = event.target.files[0];
        const textType = /text.*/;

        if (file.type.match(textType)) {
            const reader = new FileReader();

            reader.onload = () => {
                const content = reader.result;
                props.setText(content);
                handleReveal(content);
            }

            reader.readAsText(file);
        }
    };

    return (
        <Box sx={{p: 3, m: 3, border: '1px dashed lightGrey'}}>
            <AlertNotification
                alertStatus={props.alertStatus}
                setAlertStatus={props.setAlertStatus}
            />
            <InputController
                setTokens={props.setTokens}
                setAlertStatus={props.setAlertStatus}
                alertStatus={props.alertStatus}
                handleReveal={handleReveal}
                handleUpload={handleUpload}

                handleTextChange={handleTextChange}
                text={props.text}
                setText={props.setText}
                fileName={fileName}
                saveCorpus={saveCorpus}

                isMember={props.isMember}
                resetState={resetState}
                errorState={props.errorState}
                saveStatus={saveStatus}
                setSaveStatus={setSaveStatus}

                loadCurrentCorpus={loadCurrentCorpus}
                setConfirmationConfig={props.setConfirmationConfig}
            />
        </Box>
    )
}

export default MainController;