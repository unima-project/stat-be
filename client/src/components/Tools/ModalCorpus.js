import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Corpus} from '../Corpuses';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {CommonContext} from "../../App";

export const ModalCorpus = (props) => {
    const [open, setOpen] = React.useState(false);
    const {setLoading} = React.useContext(CommonContext);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
                startIcon={<TextSnippetIcon/>}
                sx={{minWidth: 110}}
            >Corpus</Button>
            <Dialog
                onClose={handleClose}
                open={open}
                maxWidth="md"
            >
                <DialogTitle>Corpus List</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                ><CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <Corpus
                        loadCurrentCorpus={props.loadCurrentCorpus}
                        handleModalClose={handleClose}
                        setConfirmationConfig={props.setConfirmationConfig}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}