import React from 'react';
import {GetCollocationList} from "../../models";
import {DataGrid} from '@mui/x-data-grid';
import Box from '@mui/system/Box'
import FormControl from "@mui/material/FormControl";
import {Stack} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const columns = [
    {field: 'id', headerName: 'ID', type: 'number', width: 10},
    {field: 'term', headerName: 'Term', width: 100},
    {field: 'collocate', headerName: 'Collocate', width: 100},
    {field: 'count', headerName: 'Count', type: 'number', width: 90}
];

const Collocate = (props) => {
    const [collocationList, setCollocationList] = React.useState([])
    const [keyword, setKeyword] = React.useState("");

    React.useEffect(() => {
        getCollocationList()
    }, [props.tokens, props.keyword, keyword])

    const filterCollocationList = (colList) => {
       return colList.filter((col) => {
            return col.term === setupKeyword()
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
        setCollocationList(setupKeyword().length > 0 ?
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

    const handleTextChange = (event) => {
        setKeyword(event.target.value);
    }

    const setupKeyword = () => {
        if (keyword.length <= 0) {
            return props.keyword
        } else {
            return keyword
        }
    }

    const keyTextBox =
        <Box sx={{minWidth: 120, m: 1}}>
            <Stack spacing={1} direction="row">
                <FormControl>
                    <TextField
                        id="outlined-basic"
                        label="keyword"
                        variant="outlined"
                        onChange={handleTextChange}
                        value={keyword}
                    />
                </FormControl>
            </Stack>
        </Box>

    return (
        <>
            <Box sx={{ textAlign: "center"}}>
                <h4>Collocates</h4>
            </Box>
            {keyTextBox}
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
                sx={{maxHeight: 400}}
            />
        </>
    );
}
export default Collocate;