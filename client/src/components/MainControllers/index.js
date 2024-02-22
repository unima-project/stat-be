import React from 'react';
import Box from "@mui/system/Box";
import {GetTokenList, GetTokenListUpload} from "../../models";
import {AlertNotification} from "./alert";
import {InputController} from "./InputController";

const MainController = (props) => {
    const [fileName, setFileName] = React.useState("")
    const [text, setText] = React.useState("");

    const resetState = () => {
        setFileName("");
        setText("");
        props.setKeyword("");
        props.setLoading(false);
    }

    const handleReveal = () => {
        props.setAlertMessage("");
        props.setLoading(true);

        GetTokenList(text)
            .then(data => {
                props.setTokens(data.data)
            })
            .catch(error => {
                props.setAlertMessage(`handle reveal: ${error}`)
            })
            .finally(() => {
                resetState();
            })
    }
    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleUpload = (event) => {
        props.setAlertMessage("")
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
                props.setTokens(data.data)
            })
            .catch(error => {
                props.setAlertMessage(`handle upload: ${error}`)
            })
            .finally(() => {
                resetState();
            })
    };

    return (
        <Box sx={{p: 3, m: 3, border: '1px dashed lightGrey'}}>
            <AlertNotification
                alertMessage={props.alertMessage}
                setAlertMessage={props.setAlertMessage}
            />
            <InputController
                setTokens={props.setTokens}
                setAlertMessage={props.setAlertMessage}
                handleReveal={handleReveal}
                handleUpload={handleUpload}
                handleTextChange={handleTextChange}
                text={text}
                fileName={fileName}
            />
        </Box>
    )
}

export default MainController;