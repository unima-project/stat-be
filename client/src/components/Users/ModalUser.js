import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {defaultUserData} from '../../models';
import {userAction} from "./index";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {AlertNotification} from "../commons/Alert";
import {ModalUserContent} from "./ModalUserContent";

export const ModalUser = (props) => {
    const [userData, setUserData] = React.useState(defaultUserData);

    React.useEffect(() => {
        setUserData(props.action.data);
    }, [props.action])

    return (
        <>
            <Dialog
                onClose={props.handleModalClose}
                open={props.modalOpen}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>{props.action.title}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.handleModalClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                ><CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <AlertNotification
                        alertStatus={props.alertStatus}
                        setAlertStatus={props.setAlertStatus}
                    />
                    <ModalUserContent
                        setUserData={setUserData}
                        userData={userData}
                        userId={props.userId}
                        resetUserPassword={props.resetUserPassword}
                        action={props.action}
                        handleModalClose={props.handleModalClose}
                        setConfirmationConfig={props.setConfirmationConfig}
                        createUser={props.createUser}
                        updateUser={props.updateUser}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}