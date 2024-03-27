import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/joy/Typography';

export const alertSeverity = {
    SUCCESS: "success"
    , INFO: "info"
    , WARNING: "warning"
    , ERROR: "error"
}

export const defaultAlertStatus = {
    message: ""
    , severity: alertSeverity.INFO
};

export const AlertNotification = (props) => {
    const [alertStatus, setAlertStatus] = React.useState(defaultAlertStatus);

    React.useEffect(() => {
        setupAlertStatus();
        const timeout = setupTimeoutClearAlertStatus()
        return () => {
            clearTimeout(timeout);
            setAlertStatus(defaultAlertStatus);
        }
    }, [props.alertStatus])

    const setupAlertStatus = () => {
        if (props.alertStatus) {
            setAlertStatus(props.alertStatus);
        }
    }

    const setupTimeoutClearAlertStatus = () => {
        return setTimeout(() => {
            setAlertStatus(defaultAlertStatus);
        },7000)
    }

    return (
        <Box sx={{marginBottom: 1, textAlign: "left"}} hidden={alertStatus.message === ""}>
            <Alert
                severity={alertStatus.severity}
                sx={{alignItems: 'flex-start'}}
                variant="filled"
                onClose={() => {
                    props.setAlertStatus(defaultAlertStatus);
                }}
            >
                <div>
                    <Typography level="body-sm" color="white">
                        {alertStatus.message}
                    </Typography>
                </div>
            </Alert>
        </Box>
    );
}