import * as React from 'react';
import Box from "@mui/system/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import {Button, Stack} from "@mui/material";


export const LoginForm = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <form onSubmit={props.handleSubmit}>
            <Box sx={{margin: 5, textAlign: "center"}}>
                <AccountCircleIcon sx={{fontSize: 100}} />
            </Box>
            <Box sx={{margin: 5, marginBottom: 7, textAlign: "center"}}>
                <Stack direction="column" spacing={3}>
                    <FormControl variant="standard" required>
                        <InputLabel>Email</InputLabel>
                        <Input
                            id="email"
                            label="email"
                            variant="standard"
                            onChange={props.handleChange}
                            value={props.auth.email}
                            autoComplete="username"
                            name="email"
                            type="email"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton><EmailIcon/></IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard" required>
                        <InputLabel>Password</InputLabel>
                        <Input
                            id="password"
                            label="password"
                            variant="standard"
                            type={showPassword ? "text" : "password"}
                            onChange={props.handleChange}
                            value={props.auth.password}
                            autoComplete="current-password"
                            name="password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Stack>
            </Box>
            <Box sx={{margin: 5, textAlign: "center"}}>
                <Button
                    fullWidth
                    variant="contained"
                    type={"submit"}
                >Log In</Button>
            </Box>
        </form>
    );
}