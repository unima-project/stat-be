import React from 'react';
import {GetCollocationList} from "../models";
import {DataGrid} from '@mui/x-data-grid';
import Box from '@mui/system/Box'

const columns = [
    {field: 'id', headerName: 'ID', type: 'number', width: 10},
    {field: 'term', headerName: 'Term', width: 100},
    {field: 'collocate', headerName: 'Collocate', width: 100},
    {field: 'count', headerName: 'Count', type: 'number', width: 90}
];

const Collocate = (props) => {
    const [collocationList, setCollocationList] = React.useState([])

    React.useEffect(() => {
        getCollocationList()
    }, [props.tokens, props.keyword])

    const filterCollocationList = (colList) => {
       return colList.filter((col) => {
            return col.term === props.keyword
        });
    }

    const reIndex = (colList) => {
        return colList.map((col, index) => {
            return {
                id: index+1
                , term: col.term
                , collocate: col.collocate
                , count: col.count
            }
        });
    }

    const setupCollocationList = (colList) => {
        setCollocationList(props.keyword.length > 0 ?
            reIndex(filterCollocationList(colList)) :
            colList)
    }

    const getCollocationList = () => {
        GetCollocationList(props.tokens)
            .then((data) => {
                setupCollocationList(data.data)
            })
            .catch(error => {
                props.setAlertMessage(`setup collocation list: ${error}`)
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
                rows={collocationList}
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
export default Collocate;