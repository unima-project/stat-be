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

export const AlertNotification = (props) => {
    return (
        <Box sx={{marginBottom: 1, textAlign: "left"}} hidden={props.alertStatus.message === ""}>
            <Alert
                severity={props.alertStatus.severity}
                sx={{alignItems: 'flex-start'}}
                variant="filled"
                onClose={() => {
                    props.setAlertStatus({
                        severity: alertSeverity.INFO
                        , message: ""
                    })
                }}
            >
                <div>
                    <Typography level="body-sm" color="white">
                        {props.alertStatus.message}
                    </Typography>
                </div>
            </Alert>
        </Box>
    );
}