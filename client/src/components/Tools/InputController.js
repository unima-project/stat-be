import React from 'react';
import Box from "@mui/system/Box";
import {Button, Stack} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {alertSeverity} from "../commons/Alert";
import {ModalCorpus} from "./ModalCorpus";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const InputController = (props) => {
    const handleSaveCorpus = () => {
        props.setConfirmationConfig({
            open: true
            , title: "Save Corpus"
            , okFunction: props.saveCorpus
            , content: `Are you sure want to save the corpus ?`
        });
    }

    return (<>
        <Box sx={{marginBottom: 1, textAlign: "center"}}>
                    <textarea
                        placeholder="text"
                        onChange={props.handleTextChange}
                        value={props.text}
                        rows={10}
                        cols={100}
                    />
        </Box>
        <Box>
            <Stack direction="row" spacing={1}>
                <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={props.handleReveal}
                    startIcon={<VisibilityIcon/>}
                >Reveal</Button>
                <Button
                    color="info"
                    size="small"
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon/>}
                >Upload
                    {
                        props.fileName === "" ?
                            <input
                                type="file"
                                onChange={props.handleUpload}
                                accept="text/plain"
                                hidden
                            /> : <></>
                    }
                </Button>
                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => {
                        props.errorState();
                        props.resetState();
                        props.setAlertStatus({
                            severity: alertSeverity.INFO
                            , message: ""
                        });
                        props.setSaveStatus(false);
                    }}
                    startIcon={<RestartAltIcon/>}
                >Reset</Button>
                {
                    props.cookie.token ?
                        <>
                            <ModalCorpus
                                loadCurrentCorpus={props.loadCurrentCorpus}
                                setConfirmationConfig={props.setConfirmationConfig}
                            />
                            {
                                props.saveStatus && props.text !== "" ?
                                    <Button
                                        size="small"
                                        color="secondary"
                                        variant="contained"
                                        onClick={handleSaveCorpus}
                                        startIcon={<SaveIcon/>}
                                    >Save</Button>
                                    : <></>
                            }
                        </>
                        : <></>
                }
            </Stack>
        </Box>
    </>)
}