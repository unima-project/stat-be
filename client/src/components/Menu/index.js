import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from "react-router-dom";
import {SetupCookies} from '../../Helpers/cookie';
import {MenuList} from "./MenuList";

export const MainMenu = () => {
    const {cookie, removeCookie} = SetupCookies();

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
                        (cookie.token) ?
                            <MenuList cookie={cookie} removeCookie={removeCookie}/> :
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