import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {UserChangePasswordForm} from "../Users/UserChangePasswordForm";

export const defaultDialogAction = {
    onClose: () => {}
    , open: false
    , title: ""
    , content: <></>
}

export const ModalForm = (props) => {
    const [dialogAction, setDialogAction] = React.useState(defaultDialogAction);

    React.useEffect(() => {
        setupDialogAction();
    }, [props.dialogAction])

    const setupDialogAction = () => {
        if (props.dialogAction) {
            setDialogAction(props.dialogAction);
        }
    }

    return (
        <>
            <Dialog
                onClose={dialogAction.onClose}
                open={dialogAction.open}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>{dialogAction.title}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={dialogAction.onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                ><CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    {dialogAction.content}
                </DialogContent>
            </Dialog>
        </>
    );
}