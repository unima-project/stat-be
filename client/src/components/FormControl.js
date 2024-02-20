import React from 'react';
import Box from "@mui/system/Box";
import {Button, Stack} from "@mui/material";
import {GetTokenList, GetTokenListUpload} from "../models";

const FormControl = (props) => {
    const [fileName, setFileName] = React.useState("")
    const [text, setText] = React.useState("");

    const resetState = () => {
        setFileName("");
        setText("");
        props.setKeyword("");
    }

    const handleReveal = () => {
        props.setAlertMessage("")

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
        <>
            <Box sx={{marginBottom: 1, textAlign: "center"}}>
                    <textarea
                        placeholder="text"
                        onChange={handleTextChange}
                        value={text}
                        rows={10}
                        cols={100}
                    />
            </Box>
            <Box>
                <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" onClick={handleReveal}>Reveal</Button>
                        <Button size="small" variant="outlined" component="label">
                            Upload
                            {
                                fileName === "" ?
                                    <input
                                        type="file"
                                        onChange={handleUpload}
                                        accept="text/plain"
                                        hidden
                                    /> : <></>
                            }
                        </Button>
                </Stack>
            </Box>
        </>
    )
}

export default FormControl;