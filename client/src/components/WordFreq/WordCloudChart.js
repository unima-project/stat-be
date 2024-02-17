import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import Box from '@mui/system/Box'

const WordCloudChart = (props) => {
    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
        fontSizes: [10,75],
    };

    const size = [500, 250];

    return (
        <Box
            sx={{
                height: 300,
                overflow: "hidden",
                overflowY: "scroll",
                overflowX: "scroll",
            }}
        >
        <ReactWordcloud
            words={props.data}
            options={options}
            size={size}
        />
        </Box>
    );
}
export default WordCloudChart;