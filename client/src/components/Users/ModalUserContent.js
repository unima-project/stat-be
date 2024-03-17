import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {userStatus, userTypeItems} from "../../models";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {Button, Stack} from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import {userAction} from "./index";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import DialogActions from "@mui/material/DialogActions";

export const ModalUserContent = (props) => {
    const userStatusConfig = {
        0: {
            label: userStatus.USER_INACTIVE.label
            , color: "error"
        }
        , 1: {
            label: userStatus.USER_ACTIVE.label
            , color: "primary"
        }
    }

    const handleChange = (data) => {
        props.setUserData({...props.userData, ...data});
    }

    const formTextField = (prop) => {
        return (
            <FormControl fullWidth>
                <TextField
                    type={prop.type}
                    label={prop.label}
                    variant="outlined"
                    value={prop.value}
                    onChange={(event) => {
                        handleChange(prop.data(event));
                    }}
                    required
                    multiline={prop.multiline}
                />
            </FormControl>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setConfirmationConfig({
            open: true
            , title: props.action.title
            , okFunction: () => {
                props.action.title === userAction.INPUT_USER
                    ? props.createUser(props.userData)
                    : props.updateUser(props.userData)
            }
            , content: `Are you sure want to ${props.action.title} ${props.userData.name} ?`
        });
    }

    const handleResetPassword = (event) => {
        props.setConfirmationConfig({
            open: true
            , title: props.action.title
            , okFunction: () => props.resetUserPassword(props.userData.id)
            , content: `Are you sure want to reset ${props.userData.name} password ?`
        });
    }

    const formSelectField = (prop) => {
        return (
            <FormControl fullWidth required disabled={props.userData.id === props.userId}>
                <InputLabel>{prop.label}</InputLabel>
                <Select
                    size="small"
                    value={prop.value}
                    label={prop.label}
                    onChange={(event) => {
                        handleChange(prop.data(event));
                    }}
                >
                    {
                        prop.items().map((item, index) => {
                            return (
                                <MenuItem value={item.value} key={index}>
                                    <Stack direction="row" spacing={1} alignItems={"center"}>
                                        <Typography color={item.color}>{item.icon(22)}</Typography>
                                        <Typography color={item.color}>{item.label}</Typography>
                                    </Stack>
                                </MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
        )
    }
    const formCheckedField = (prop) => {
        return (
            <FormControl fullWidth disabled={props.userData.id === props.userId}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Switch
                        checked={prop.value}
                        onChange={(event) => {
                            handleChange(prop.data(event));
                        }}
                        required
                    />
                    <Typography color={userStatusConfig[prop.value ? 1 : 0].color}>{
                        userStatusConfig[prop.value ? 1 : 0].label
                    }</Typography>
                </Stack>
            </FormControl>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                props.userData ?
                    <Box sx={{flexGrow: 1, marginTop: 3}}>
                        <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 1, md: 1}}>
                            <Grid xs={4}>
                                {formSelectField({
                                    label: "Type"
                                    , value: parseInt(props.userData.user_type)
                                    , data: (event) => {
                                        return {user_type: event.target.value}
                                    }
                                    , items: userTypeItems
                                })}
                            </Grid>
                            <Grid xs={8}>
                                {
                                    props.action.title === userAction.EDIT_USER
                                        ? <Button
                                            size="small"
                                            sx={{p: 1}}
                                            variant="contained"
                                            color="info"
                                            onClick={handleResetPassword}
                                            startIcon={<KeyIcon/>}
                                        >Reset Password</Button>
                                        : <></>
                                }
                            </Grid>
                            <Grid xs={6}>
                                {formTextField({
                                    label: "Name"
                                    , value: props.userData.name
                                    , data: (event) => {
                                        return {name: event.target.value}
                                    }
                                    , multiline: false
                                })}
                            </Grid>
                            <Grid xs={6}>
                                {formTextField({
                                    label: "Email"
                                    , type: "email"
                                    , value: props.userData.email
                                    , data: (event) => {
                                        return {email: event.target.value}
                                    }
                                    , multiline: false
                                })}
                            </Grid>
                            <Grid xs={4}>
                                {formTextField({
                                    label: "No.KTP"
                                    , value: props.userData.no_ktp
                                    , data: (event) => {
                                        return {no_ktp: event.target.value}
                                    }
                                    , multiline: false
                                })}
                            </Grid>
                            <Grid xs={4}>
                                {formTextField({
                                    label: "No.HP"
                                    , value: props.userData.no_hp
                                    , data: (event) => {
                                        return {no_hp: event.target.value}
                                    }
                                    , multiline: false
                                })}
                            </Grid>
                            <Grid xs={6}>
                                {formTextField({
                                    label: "Address"
                                    , value: props.userData.address
                                    , data: (event) => {
                                        return {address: event.target.value}
                                    }
                                    , multiline: true
                                })}
                            </Grid>
                            <Grid xs={6}>
                                {formTextField({
                                    label: "Reason"
                                    , value: props.userData.reason
                                    , data: (event) => {
                                        return {reason: event.target.value}
                                    }
                                    , multiline: true
                                })}
                            </Grid>
                            <Grid xs={12}>
                                {formCheckedField({
                                    label: "Status"
                                    , value: props.userData.status
                                    , data: (event) => {
                                        return {status: event.target.checked}
                                    }
                                })}
                            </Grid>
                        </Grid>
                        <DialogActions sx={{p: 2}}>
                            <Button
                                color="error"
                                variant="contained"
                                onClick={props.handleModalClose}
                                startIcon={<RestartAltIcon/>}
                                autoFocus
                            >Cancel</Button>
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<SaveIcon/>}
                                type="submit"
                                autoFocus
                            >Save</Button>
                        </DialogActions>
                    </Box>
                    : <></>
            }
        </form>
    )
}