import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import Box from '@mui/system/Box'
import Slider from "@mui/material/Slider";

const WordCloudChart = (props) => {
    const [wordFreqList, setWordFreqList] = React.useState([])
    const [wordNumber, setWordNumber] = React.useState(100)

    React.useEffect(() => {
        setWordFreqList(props.data.slice(0, wordNumber))
    }, [props.data, wordNumber])

    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
        fontSizes: [10, 75],
    };

    const size = [500, 350];

    const onSliderChange = (e) => {
        setWordNumber(e.target.value);
    }

    const onWordClick = (event) => {
        props.setupKeyword(event.text);
    }

    return (
        <>
            <ReactWordcloud
                words={wordFreqList}
                options={options}
                size={size}
                callbacks={
                    {
                        onWordClick: onWordClick
                    }
                }
            />
            <Box sx={{p: 2, textAlign: "center"}}>
                <Slider
                    defaultValue={wordNumber}
                    aria-label="number"
                    valueLabelDisplay="auto"
                    onChange={onSliderChange}
                    min={30}
                    max={props.data.length}
                    step={5}
                />
                words: <strong>{wordNumber}</strong>
            </Box>
        </>
    );
}
export default WordCloudChart;