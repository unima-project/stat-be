import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

export const confirmationConfigDefault = {
    open: false
    , title: ""
    , okFunction: () => {}
    , content: ""
}

export const ModalConfirmation = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);

    React.useEffect(() => {
        setConfirmationConfig(props.confirmationConfig);
    }, [props.confirmationConfig])

    const handleCancel = () => {
        setConfirmationConfig({
            ...confirmationConfig
            , open: false
        })
    };

    const handleOk = () => {
        setConfirmationConfig({
            ...confirmationConfig
            , open: false
        })

        confirmationConfig.okFunction();
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={confirmationConfig.open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
                maxWidth={"md"}
            >
                <DialogTitle id="responsive-dialog-title">
                    {confirmationConfig.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {confirmationConfig.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleOk} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}