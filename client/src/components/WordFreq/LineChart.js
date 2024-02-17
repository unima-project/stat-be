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
            display: true,
            text: 'Word Frequency',
        },
    },
};


const LineChart = (props) => {
    const [wordFreqList, setWordFreqList] = React.useState([])

    React.useEffect(() => {
        setWordFreqList(props.data.slice(0, 30))
    }, [props.data])

    const data = {
        labels: wordFreqList.map(row => row.text),
        datasets: [
            {
                data: props.data.map(row => row.value),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.5,
            },
        ],
    };


    return (
        <Box
            sx={{
                height: 300,
                overflow: "hidden",
                overflowY: "scroll",
                overflowX: "scroll",
            }}
        >
            <Line
                data={data}
                options={options}
            />
        </Box>
    );
}
export default LineChart;