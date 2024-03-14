import React from 'react';
import Grid from "@mui/system/Unstable_Grid";
import WordFreq from "./WordFreqs";
import Token from "./Token";
import Concordance from "./Concordance";
import Collocate from "./Collocate";
import Ngram from "./Ngram";
import Box from "@mui/system/Box";

export const Result = (props) => {
    return (
        <Box sx={{p: 2, m: 3, border: '1px dashed lightGrey', flexGrow: 1}}>
            <Grid spacing={2} container>
                <WordFreq tokens={props.tokens} setAlertStatus={props.setAlertStatus} setupKeyword={props.setupKeyword}/>
                <Grid xs={6} sx={{
                    border: '1px solid lightGrey'
                    , height: 550
                    , overflow: "hidden"
                    , overflowY: "scroll"
                    , overflowX: "scroll"
                }}>
                    <Token tokens={props.tokens} setupKeyword={props.setupKeyword} keyword={props.keyword}/>
                </Grid>
                <Grid xs={6} sx={{
                    border: '1px solid lightGrey'
                    , height: 550
                    , overflow: "hidden"
                    , overflowY: "scroll"
                    , overflowX: "scroll"
                }}>
                    <Concordance tokens={props.tokens} keyword={props.keyword} setAlertStatus={props.setAlertStatus}/>
                </Grid>
                <Grid xs={6} sx={{
                    border: '1px solid lightGrey'
                    , height: 550
                    , overflow: "hidden"
                    , overflowY: "scroll"
                    , overflowX: "scroll"
                }}>
                    <Collocate tokens={props.tokens} setAlertStatus={props.setAlertStatus} keyword={props.keyword}/>
                </Grid>
                <Grid xs={6} sx={{
                    border: '1px solid lightGrey'
                    , height: 550
                    , overflow: "hidden"
                    , overflowY: "scroll"
                    , overflowX: "scroll"
                }}>
                    <Ngram tokens={props.tokens} setAlertStatus={props.setAlertStatus} keyword={props.keyword}/>
                </Grid>
            </Grid>
        </Box>
    )
}