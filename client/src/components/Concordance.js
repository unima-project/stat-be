import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {GetConcordanceList} from "../models";
import Box from '@mui/system/Box';

const columns = [
    {field: 'id', headerName: 'ID', type: 'number', width: 10, align: "right"},
    {field: 'left', headerName: 'Left', width: 300, align: "right"},
    {field: 'term', headerName: 'Term', width: 100, align: "center"},
    {field: 'right', headerName: 'Right', width: 300, align: "left"}
];

const Concordance = (props) => {
    const [concordanceList, setConcordanceList] = React.useState([])

    React.useEffect(() => {
        setupConcordanceList()
    }, [props.tokens, props.keyword])
    const setupConcordanceList = () => {
        GetConcordanceList(props.tokens, props.keyword)
            .then((data) => {
                setConcordanceList(data.data)
            })
            .catch(error => {
                props.setAlertMessage(`setup concordance list: ${error}`)
            })
    };

    return (
        <Box
            sx={{
                height: 400,
                overflow: "hidden",
                overflowY: "scroll",
                overflowX: "scroll",
            }}
        >
            <DataGrid
                size="small"
                rows={concordanceList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </Box>
    );
}
export default Concordance;