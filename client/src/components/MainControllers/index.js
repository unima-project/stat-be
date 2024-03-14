import React from 'react';
import Box from "@mui/system/Box";
import {GetTokenList, GetTokenListUpload} from "../../models";
import {LoadCorpus, SaveCorpus} from "../../models/Corpus";
import {AlertNotification} from "../Alert";
import {InputController} from "./InputController";
import {useCookies} from "react-cookie";
import {alertSeverity} from "../Alert";

const MainController = (props) => {
    const [fileName, setFileName] = React.useState("")
    const [text, setText] = React.useState("");
    const [cookie, setCookie] = useCookies(['token']);
    const [saveStatus, setSaveStatus] = React.useState(false);

    React.useEffect(() => {
        if (props.corpusId) loadCurrentCorpus();
    }, [])

    const resetState = () => {
        setFileName("");
        props.setKeyword("");
        props.setLoading(false);
    }

    const errorState = () => {
        setText("");
        props.setTokens([]);
    }

    const loadCurrentCorpus = () => {
        props.setLoading(true);

        LoadCorpus(props.corpusId, cookie.token)
            .then(async (data) => {
                await getTokenList(data.data.corpus);
            })
            .catch(error => {
                props.setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `load corpus: ${error}`
                })
            })
            .finally(() => {
                props.setLoading(false);
                setSaveStatus(false);
            })
    }

    const saveCorpus = () => {
        props.setLoading(true);

        SaveCorpus(text, cookie.token)
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

    const getTokenList = async (text) => {
        props.setLoading(true);

        try {
            const data = await GetTokenList(text)
            props.setTokens(data.data.token);
            setText(data.data.corpus);
        } catch (error) {
            props.setAlertStatus({
                severity: alertSeverity.ERROR
                , message: `get token list: ${error}`
            })
            errorState();
        }
    }

    const handleReveal = () => {
        props.setAlertStatus({
            severity: alertSeverity.INFO
            , message: ""
        })

        getTokenList(text)
            .then(() => {
                setSaveStatus(true);
            })
            .finally(() => {
                resetState();
            })
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleUpload = (event) => {
        props.setAlertStatus({
            severity: alertSeverity.INFO
            , message: ""
        })
        props.setLoading(true);

        if (event.target.files.length <= 0) {
            return
        }

        setFileName(event.target.files[0].name)

        const formData = new FormData();
        formData.set(
            "text",
            event.target.files[0],
            event.target.files[0].name);

        GetTokenListUpload(formData)
            .then(data => {
                props.setTokens(data.data.token);
                setText(data.data.corpus);
                setSaveStatus(true);
            })
            .catch(error => {
                props.setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `handle upload: ${error}`
                })
               errorState();
            })
            .finally(() => {
                resetState();
            })
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
                text={text}
                setText={setText}
                fileName={fileName}
                saveCorpus={saveCorpus}
                cookie={cookie}
                resetState={resetState}
                errorState={errorState}
                saveStatus={saveStatus}
                setSaveStatus={setSaveStatus}
            />
        </Box>
    )
}

export default MainController;