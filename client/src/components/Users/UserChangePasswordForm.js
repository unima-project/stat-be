import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {OutlinedInput, Stack} from "@mui/material";
import Box from "@mui/system/Box";
import {AlertNotification, alertSeverity, defaultAlertStatus} from "../commons/Alert";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import DialogActions from "@mui/material/DialogActions";
import {UpdateUserPassword} from "../../models";
import {SetupCookies} from '../../Helpers/cookie';
import {userAction} from "./index";

export const UserChangePasswordForm = (props) => {
    const {cookie} = SetupCookies();
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [alertStatus, setAlertStatus] = React.useState(defaultAlertStatus);
    const [dataPassword, setDataPassword] = React.useState({
        old_password: "", new_password: "", confirm_password: ""
    })

    const handlePasswordState = (data) => {
        setDataPassword({
            ...dataPassword
            , ...data
        });
    }

    const handleShowPasswordState = (showPasswordState, setShowPasswordState) => {
        setShowPasswordState(!showPasswordState);
    }

    const  changeUserPassword = (userPassword) => {
        UpdateUserPassword(userPassword, cookie.token)
            .then(data => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: data.message
                })
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `change user password: ${error}`
                })
            })
    }

    const handleConfirmPassword = (confirmPassword) => {
        if (!validatePassword(confirmPassword)) {
            setAlertStatus({
                message: "Password is not match"
                , severity: alertSeverity.ERROR
            });
            return false
        } else {
            setAlertStatus(defaultAlertStatus);
            return true
        }
    }

    const validatePassword = (confirmPassword) => {
        return (confirmPassword === dataPassword.new_password)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleConfirmPassword(dataPassword.confirm_password)) {
            props.setConfirmationConfig({
                open: true
                , title: "Change password"
                , okFunction: () => changeUserPassword(dataPassword)
                , content: `Are you sure want to change password ?`
            });
        }
    }

    const passwordComponent = (prop) => {
        return (
            <FormControl sx={{m: 1, width: '30ch'}} variant="outlined" required>
                <InputLabel>{prop.label}</InputLabel>
                <OutlinedInput
                    id={prop.id}
                    name={prop.id}
                    type={prop.type}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={prop.iconOnClick}>
                                {prop.icon}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={prop.label}
                    onChange={(event) => prop.onChange(event)}
                />
            </FormControl>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
            <Stack spacing={1} direction="row" alignItems="center">
                <Box>
                    {passwordComponent({
                        label: "Old Password"
                        , id: "old_password"
                        , type: showOldPassword ? 'text' : 'password'
                        , iconOnClick: () => handleShowPasswordState(showOldPassword, setShowOldPassword)
                        , icon: showOldPassword ? <Visibility/> : <VisibilityOff/>
                        , onChange: (event) => handlePasswordState({old_password: event.target.value})
                    })}
                </Box>
                <Box>
                    {passwordComponent({
                        label: "New Password"
                        , id: "new_password"
                        , type: showNewPassword ? 'text' : 'password'
                        , iconOnClick: () => handleShowPasswordState(showNewPassword, setShowNewPassword)
                        , icon: showNewPassword ? <Visibility/> : <VisibilityOff/>
                        , onChange: (event) => handlePasswordState({new_password: event.target.value})
                    })}
                </Box>
                <Box>
                    {passwordComponent({
                        label: "Confirm Password"
                        , id: "confirm_password"
                        , type: showConfirmPassword ? 'text' : 'password'
                        , iconOnClick: () => handleShowPasswordState(showConfirmPassword, setShowConfirmPassword)
                        , icon: showConfirmPassword ? <Visibility/> : <VisibilityOff/>
                        , onChange: (event) => {
                            handlePasswordState({confirm_password: event.target.value});
                            handleConfirmPassword(event.target.value);
                        }
                    })}
                </Box>
            </Stack>
            <DialogActions sx={{p: 2}}>
                <Button
                    color="error"
                    variant="contained"
                    onClick={props.closeDialogAction}
                    startIcon={<RestartAltIcon/>}
                    autoFocus
                >Cancel</Button>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<SaveIcon/>}
                    autoFocus
                    type="submit"
                >Save</Button>
            </DialogActions>
        </form>
    )
}