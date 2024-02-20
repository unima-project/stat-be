import React from 'react';
import Grid from "@mui/system/Unstable_Grid";
import WordCloudChart from "./WordCloudChart";
import LineChart from "./LineChart";
import {GetWordFreqList} from "../../models";

const WordFreq = (props) => {
    const [wordFrequencies, setWordFrequencies] = React.useState([])

    React.useEffect(() => {
        getWordFreq()
    }, [props.tokens])

    const getWordFreq = () => {
        GetWordFreqList(props.tokens)
            .then((data) => {
                setWordFrequencies(data.data);
            })
            .catch(error => {
                props.setAlertMessage(`get word frequency: ${error}`)
            })
    }

    return(
        <>
            <Grid xs={6} sx={{
                border: '1px solid lightGrey'
                , height: 550
                , overflow: "hidden"
                , overflowY: "scroll"
                , overflowX: "scroll"
            }}>
                <WordCloudChart data={wordFrequencies}/>
            </Grid>
            <Grid xs={6} sx={{
                border: '1px solid lightGrey'
                , height: 550
                , overflow: "hidden"
                , overflowY: "scroll"
                , overflowX: "scroll"
            }}>
                <LineChart data={wordFrequencies}/>
            </Grid>
        </>
    )
}

export default WordFreq;