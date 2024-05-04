
import * as React from 'react';
import Box from "@mui/system/Box";
import {AuthLogin, userType} from "../../models";
import {AlertNotification} from "../commons/Alert";
import {useNavigate} from "react-router-dom";
import {LoginForm} from "./Login";
import {alertSeverity} from "../commons/Alert";
import {SetupCookies} from "../../Helpers/cookie";
import {CommonContext} from "../../App";

export const Login = (props) => {
    const navigate = useNavigate();
    const [auth, setAuth] = React.useState({
        email: "", password: ""
    });
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const {cookieUserToken, setCookie} = SetupCookies();
    const {setLoading} = React.useContext(CommonContext);


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
        setLoading(true);
        AuthLogin(auth)
            .then(data => {
                const date = new Date();
                const expiresDate = new Date(date.getTime() + (60 * 60 * 1000));
                const options = {
                    path: '/',
                    expires: expiresDate,
                }

                setCookie('token', data.data.token, options);
                setCookie('name', data.data.name, options);
                setCookie('id', data.data.id, options);

                if (data.data.type === userType.USER_ADMIN.value) {
                    navigate("/users");
                } else {
                    navigate("/");
                }
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <center>
            <Box sx={{
                textAlign: 'center'
                , mt: 20
                , maxWidth: "350pt"
            }}>

                {
                    cookieUserToken ?
                        <></> : <>
                            <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                            <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} auth={auth}/>
                        </>
                }

            </Box>
        </center>
    );
}
