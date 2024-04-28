import React from 'react';
import Box from "@mui/material/Box";
import {SetupCookies} from '../../Helpers/cookie';
import {GetUserProfile} from "../../models";
import {AlertNotification, alertSeverity, defaultAlertStatus} from "../commons/Alert";
import {UserProfileController} from "./UserProfileController";
import {defaultUserData} from '../../models';
import {useNavigate} from 'react-router';
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";
import {CommonContext} from "../../App";

export const UserProfile = () => {
    const navigate = useNavigate();
    const {cookie} = SetupCookies();
    const [userProfile, setUserProfile] = React.useState(defaultUserData);
    const [alertStatus, setAlertStatus] = React.useState(defaultAlertStatus);
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const {setLoading} = React.useContext(CommonContext);

    React.useEffect(() => {
        if (!cookie.token) {
            navigate("/");
        } else {
            getUserProfile();
        }
    }, [])

    const getUserProfile = () => {
        setLoading(true);

        GetUserProfile(cookie.token)
            .then(data => {
                setUserProfile(data.data);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `get user profile: ${error}`
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Box sx={{marginTop: 15}}>
            <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
            <ModalConfirmation confirmationConfig={confirmationConfig}/>
            <UserProfileController
                userProfile={userProfile}
                alertStatus={alertStatus}
                setConfirmationConfig={setConfirmationConfig}
            />
        </Box>
    );
}