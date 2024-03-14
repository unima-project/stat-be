import React from 'react';
import Box from "@mui/material/Box";
import {SetupCookies} from '../Helpers/cookie';
import {GetUserProfile} from "../../models/User";

export const UserProfile = () => {
    const {cookie} = SetupCookies();
    const {userProfile, setUserProfile} = React.useState({});

    React.useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = () => {
        GetUserProfile(cookie.token)
            .then(data => {
                setUserProfile(data.data);
            })
            .catch(error => {
                console.log("error get user profile", error.message);
            })
    }

    return (
        <Box sx={{marginTop: 15}}>
            <h2>User Profile</h2>
            {userProfile}
        </Box>
    );
}