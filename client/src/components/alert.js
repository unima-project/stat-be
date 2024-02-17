import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

export default function AlertNotification(props) {
    return (
        <Box sx={{marginBottom: 1, textAlign: "left"}} hidden={props.alertMessage === ""}>
            <Alert
                key='Error'
                sx={{alignItems: 'flex-start'}}
                startDecorator={<WarningIcon/>}
                variant="solid"
                color="danger"
                endDecorator={
                    <IconButton variant="solid" size="sm" color="danger">
                        <CloseIcon onClick={() => props.setAlertMessage("")}/>
                    </IconButton>
                }
            >
                <div>
                    <div>{"Error"}</div>
                    <Typography level="body-sm" color="white">
                        {props.alertMessage}
                    </Typography>
                </div>
            </Alert>
        </Box>
    );
}