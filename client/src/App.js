import React from 'react';
import {Container} from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import Box from '@mui/system/Box';
import Token from "./components/Token";
import Concordance from "./components/Concordance";
import Collocate from "./components/Collocate";
import FormControl from "./components/FormControl";
import WordFreq from "./components/WordFreq";
import AlertNotification from "./components/alert";
import Ngram from "./components/Ngram";
import {Result} from "./components";


function App() {
    const [tokens, setTokens] = React.useState([]);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [keyword, setKeyword] = React.useState("");

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
            </Box>
            <Box sx={{p: 3, m: 3, border: '1px dashed lightGrey'}}>
                <AlertNotification alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
                <FormControl setTokens={setTokens} setAlertMessage={setAlertMessage} setKeyword={setKeyword}/>
            </Box>
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