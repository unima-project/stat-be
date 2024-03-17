import React from 'react';
import {Button, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {userTypeConfig} from "../../models";
import {defaultUserData} from '../../models';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BadgeIcon from '@mui/icons-material/Badge';
import TextsmsIcon from '@mui/icons-material/Textsms';
import KeyIcon from "@mui/icons-material/Key";
import {ModalForm, defaultDialogAction} from "../commons/ModalForm";
import {UserChangePasswordForm} from "./UserChangePasswordForm";

export const UserProfileController = (props) => {
    const [userProfile, setUserProfile] = React.useState(defaultUserData);
    const [dialogAction, setDialogAction] = React.useState(defaultDialogAction);

    React.useEffect(() => {
        setupUserProfile();
    }, [props.userProfile])

    const setupUserProfile = () => {
        if (props.userProfile) {
            setUserProfile(props.userProfile)
        }
    }

    const closeDialogAction = () => {
        setDialogAction(defaultDialogAction);
    }

    const openDialogAction = () => {
        setDialogAction({
            onClose: closeDialogAction
            , open: true
            , title: "Change password"
            , content: <UserChangePasswordForm
                closeDialogAction={closeDialogAction}
                setConfirmationConfig={props.setConfirmationConfig}
            />
        })
    }

    const badgeComp =
        <Typography color={userTypeConfig[userProfile.user_type].color}>
            {userTypeConfig[userProfile.user_type].icon(175)}
        </Typography>

    const nameComp =
        <Typography sx={{fontSize: 30, fontWeight: "bold"}}>
            {userProfile.name.toUpperCase()}
        </Typography>

    const addressComp =
        <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1}>
                <EmailIcon/>
                <Typography>{userProfile.email}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <PhoneAndroidIcon/>
                <Typography>{userProfile.no_hp}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <HomeIcon/>
                <Typography>{userProfile.address}</Typography>
            </Stack>
        </Stack>

    const identityComp =
        <Stack direction="column" spacing={2} >
            <Stack direction="row" spacing={1}>
                <BadgeIcon/>
                <Typography>{userProfile.no_ktp}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <TextsmsIcon/>
                <Typography>{userProfile.reason}</Typography>
            </Stack>
            <Button
                size="small"
                sx={{p:1, minWidth: 200}}
                variant="contained"
                color="info"
                onClick={openDialogAction}
                startIcon={<KeyIcon/>}
            >Change Password</Button>
        </Stack>

    const content =
        <Stack direction="column" spacing={2}>
            <Box>{nameComp}</Box>
            <Grid container rowSpacing={2}>
                <Grid xs={6}>
                    {addressComp}
                </Grid>
                <Grid xs={6}>
                    {identityComp}
                </Grid>
            </Grid>
        </Stack>

    return (
        <Box sx={{p: 5, border: '1px solid'}}>
            <ModalForm dialogAction={dialogAction} />
            <Stack direction="row" alignItems="center" spacing={2}>
                <Box>{badgeComp}</Box>
                <Box>{content}</Box>
            </Stack>
        </Box>
    )
}