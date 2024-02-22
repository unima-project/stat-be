import React from 'react';
import {Container} from '@mui/material';
import Box from '@mui/system/Box';
import {Result} from "./components/Results";
import MainController from "./components/MainControllers";
import CircularProgress from "@mui/material-next/CircularProgress";
import Backdrop from "@mui/material/Backdrop";


function App() {
    const [tokens, setTokens] = React.useState([]);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [keyword, setKeyword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const setupKeyword = (word) => {
        if (word === keyword) {
            setKeyword("");
        } else {
            setKeyword(word);
        }
    }

    return (
        <Container>
            <Box sx={{p: 2, m: 3, border: '1px dashed lightGrey', textAlign: 'center'}}>
                <h1>S.T.A.T</h1> Simple Text Analytic Tool
                <Backdrop
                    sx={{color: '#fff', zIndex: 1, position: "fixed"}}
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </Box>
            <MainController
                tokens={tokens}
                setTokens={setTokens}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
                setKeyword={setKeyword}
                setLoading={setLoading}
            />
            {
                tokens.length > 0 && alertMessage === "" ?
                    <Result
                        tokens={tokens}
                        setupKeyword={setupKeyword}
                        setAlertMessage={setAlertMessage}
                        keyword={keyword}
                    /> : <></>
            }
        </Container>
    );
}

export default App;