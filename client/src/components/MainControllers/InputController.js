import React from 'react';
import Box from "@mui/system/Box";
import {Button, Stack} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {alertSeverity} from "../Alert";
import {ModalCorpus} from "./ModalCorpus";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const InputController = (props) => {
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
                    size="small"
                    variant="contained"
                    onClick={props.handleReveal}
                    startIcon={<VisibilityIcon/>}
                >Reveal</Button>
                <Button size="small" variant="outlined" component="label" startIcon={<CloudUploadIcon/>}>
                    Upload
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
                    variant="outlined"
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
                            <ModalCorpus loadCurrentCorpus={props.loadCurrentCorpus}/>
                            {
                            props.saveStatus && props.text !== "" ?
                                <Button
                                    size="small"
                                    color="secondary"
                                    variant="contained"
                                    onClick={props.saveCorpus}
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