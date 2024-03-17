import React from 'react';
import Box from "@mui/system/Box";
import MainController from "./MainController";
import {Result} from "../Results";
import Typography from "@mui/material/Typography";
import {alertSeverity} from "../commons/Alert";
import {Loading} from "../commons/Loading";
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";

export const Tool = () => {
    const [tokens, setTokens] = React.useState([]);
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const [keyword, setKeyword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);

    const setupKeyword = (word) => {
        if (word === keyword) {
            setKeyword("");
        } else {
            setKeyword(word);
        }
    }

    return (
        <>
            <Loading open={loading}/>
            <ModalConfirmation confirmationConfig={confirmationConfig}/>
            <Box sx={{marginTop: 10, textAlign: 'center'}}>
                <Typography
                    noWrap
                    variant="h5"
                    sx={{
                        color: 'inherit',
                        fontWeight: 700,
                    }}
                >
                    Simple Text Analysis Tool
                </Typography>
                <MainController
                    tokens={tokens}
                    setTokens={setTokens}
                    alertStatus={alertStatus}
                    setAlertStatus={setAlertStatus}
                    setKeyword={setKeyword}
                    setLoading={setLoading}
                    setConfirmationConfig={setConfirmationConfig}
                />
                {
                    tokens.length > 0 ?
                        <Result
                            tokens={tokens}
                            setupKeyword={setupKeyword}
                            setAlertStatus={setAlertStatus}
                            keyword={keyword}
                        /> : <></>
                }
            </Box>
        </>
    )
}