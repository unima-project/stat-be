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


function App() {
    const [tokens, setTokens] = React.useState([])
    const [keyword, setKeyword] = React.useState("")
    const [alertMessage, setAlertMessage] = React.useState("")

    return (
        <Container>
            <Box sx={{p: 2, m: 3, border: '1px dashed lightGrey', textAlign: 'center'}}>
                <h1>S.T.A.T</h1> Simple Text Analytic Tool
            </Box>
            <Box sx={{p: 3, m: 3, border: '1px dashed lightGrey'}}>
                <AlertNotification alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
                <FormControl setTokens={setTokens} setAlertMessage={setAlertMessage}/>
            </Box>
            <Box sx={{p: 2, m: 3, border: '1px dashed lightGrey', flexGrow: 1}}>
                <Grid spacing={2} container>
                    <WordFreq tokens={tokens} setAlertMessage={setAlertMessage}/>
                    <Grid xs={6} sx={{border: '1px solid lightGrey'}}>
                        <Token data={tokens} setKeyword={setKeyword}/>
                    </Grid>
                    <Grid xs={6} sx={{border: '1px solid lightGrey'}}>
                        <Concordance tokens={tokens} keyword={keyword} setAlertMessage={setAlertMessage}/>
                    </Grid>
                    <Grid xs={6} sx={{border: '1px solid lightGrey'}}>
                        <Collocate tokens={tokens} setAlertMessage={setAlertMessage} keyword={keyword}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;