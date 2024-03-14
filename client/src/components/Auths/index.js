import * as React from 'react';
import Box from "@mui/system/Box";
import {AuthLogin} from "../../models/Auth";
import {AlertNotification} from "../Alert";
import {useNavigate} from "react-router-dom";
import {LoginForm} from "./Login";
import {alertSeverity} from "../Alert";
import {SetupCookies} from "../Helpers/cookie";

export const Login = (props) => {
    const navigate = useNavigate();
    const [auth, setAuth] = React.useState({
        email: "", password: ""
    });
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const {cookieUserToken, setCookie} = SetupCookies();


    React.useEffect(() => {
        if (cookieUserToken) navigate("/");
    }, [cookieUserToken])

    const handleChange = (event) => {
        setAuth({
            ...auth
            , [event.target.id]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthLogin(auth)
            .then((data) => {
                const date = new Date();
                const expiresDate = new Date(date.getTime() + (60 * 60 * 1000));
                const options = {
                    path: '/',
                    expires: expiresDate,
                }

                setCookie('token', data.data.token, options);
                setCookie('name', data.data.name, options);

                navigate("/");
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
    }

    return (
        <Box sx={{
            p: 5
            , border: '1px solid darkGrey'
            , textAlign: 'center'
            , marginTop: 20
            , marginLeft: 45
            , marginRight: 45
        }}>
            {
                cookieUserToken ?
                    <></> : <>
                        <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                        <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} auth={auth}/>
                    </>
            }
        </Box>
    );
}