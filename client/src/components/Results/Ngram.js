import React from 'react';
import {GetNgramList} from "../../models";
import {DataGrid} from '@mui/x-data-grid';
import Box from '@mui/system/Box'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {Stack} from "@mui/material";
import {alertSeverity} from "../Alert";

const columns = [
    {field: 'id', headerName: 'ID', type: 'number', width: 10},
    {field: 'type', headerName: 'Type', width: 150},
    {field: 'frequency', headerName: 'Frequency', type: 'number', width: 100},
];

const Ngram = (props) => {
    const [ngramList, setNgramList] = React.useState([])
    const [size, setSize] = React.useState(2);
    const [sizeItem, setSizeItem] = React.useState([])
    const [keyword, setKeyword] = React.useState("");

    React.useEffect(() => {
        getNgramList();
        setupSelectItem();
    }, [props.tokens, size, keyword, props.keyword])

    const setupKeyword = () => {
        if (keyword.length <= 0) {
            return props.keyword
        } else {
            return keyword
        }
    }

    const filterNgramList = (ngramList) => {
        return ngramList.filter((ngram) => {
            const ngramKey = ngram.type[0]
            return ngramKey === setupKeyword()
        });
    }

    const reIndex = (ngramList) => {
        return ngramList.map((ngram, index) => {
            return {
                id: index + 1
                , type: ngram.type
                , frequency: ngram.frequency
            }
        });
    }

    const setupNgramList = (ngramList) => {
        setNgramList(setupKeyword().length > 0 ?
            reIndex(filterNgramList(ngramList)) :
            ngramList)
    }

    const getNgramList = () => {
        GetNgramList(props.tokens, size)
            .then((data) => {
                setupNgramList(data.data)
            })
            .catch(error => {
                props.setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `setup ngram list: ${error}`
                })
            })
    };

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const setupSelectItem = () => {
        const items = []
        for (let i = 1; i <= 5; i++) {
            items.push(i);
        }

        setSizeItem(items);
    }

    const handleTextChange = (event) => {
        setKeyword(event.target.value);
    }

    const control =
        <Box sx={{minWidth: 120, m: 1}}>
            <Stack spacing={1} direction="row">
                <FormControl>
                    <InputLabel id="select-label">Size</InputLabel>
                    <Select
                        labelId="select-label"
                        sx={{minWidth: 100}}
                        value={size}
                        label="Size"
                        onChange={handleChange}
                    >
                        {
                            sizeItem.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
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
            <Box sx={{textAlign: "center"}}>
                <h4>N-Grams</h4>
            </Box>
            {control}
            <DataGrid
                size="small"
                rows={ngramList}
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
export default Ngram;