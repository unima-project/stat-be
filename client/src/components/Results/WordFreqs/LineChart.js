import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import Box from '@mui/system/Box'
import Slider from '@mui/material/Slider';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Word Frequency',
        },
    },
    indexAxis: 'x',
};


const LineChart = (props) => {
    const [wordFreqList, setWordFreqList] = React.useState([])
    const [wordNumber, setWordNumber] = React.useState(30)

    React.useEffect(() => {
        setWordFreqList(props.data.slice(0, wordNumber))
    }, [props.data, wordNumber])

    const data = {
        labels: wordFreqList.map(row => row.text),
        datasets: [
            {
                data: wordFreqList.map(row => row.value),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.5,
            },
        ],
    };

    const onSliderChange = (e) => {
        setWordNumber(e.target.value);
    }


    return (
        <>
            <Box sx={{textAlign: "center"}}>
                <h4>Word Frequency</h4>
            </Box>
            <Line
                data={data}
                options={options}
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
export default LineChart;