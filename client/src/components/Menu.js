import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import {Link, useNavigate} from "react-router-dom";
import {SetupCookies} from './Helpers/cookie';
import {AccountCircle} from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {AuthLogout} from "../models/Auth";

export const MainMenu = () => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {cookieUserName, cookieUserToken, removeCookie} = SetupCookies();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        AuthLogout(cookieUserToken)
            .then((data) => {
                removeCookie("token", "");
                removeCookie("name", "");
                navigate("/");
            })
            .catch(error => {
                alert(error);
            })
    }

    const handleCorpus = () => {
        navigate("/corpuses")
    }

    const handleProfile = () => {
        navigate("/users/profile")
    }

    const settings = [
        {
            key: "Corpus"
            , func: handleCorpus
        },
        {
            key: "Profile"
            , func: handleProfile
        },
        {
            key: "Setting"
            , func: ""
        },
        {
            key: "Logout"
            , func: handleLogout
        },
    ];

    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        STAT
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Link to={'/'}>
                            <Button sx={{my: 2, display: 'block', color: 'white'}}>
                                Home
                            </Button>
                        </Link>
                        <Link to={'/tools'}>
                            <Button sx={{my: 2, display: 'block', color: 'white'}}>
                                Tool
                            </Button>
                        </Link>
                    </Box>

                    {
                        (cookieUserToken || cookieUserToken) ?
                            <div>
                                <Button
                                    sx={{color: 'white', my: 2}}
                                    endIcon={<AccountCircle/>}
                                    onClick={handleOpenUserMenu}
                                >
                                    {cookieUserName}
                                </Button>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.key} onClick={handleCloseUserMenu}>
                                            <Typography onClick={setting.func}>
                                                {setting.key}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div> :
                            <Link to={'/auth/login'}>
                                <Button sx={{my: 2, display: 'block', color: 'white'}}>
                                    Login
                                </Button>
                            </Link>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}