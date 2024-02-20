import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {GetConcordanceList} from "../models";
import Box from '@mui/system/Box';
import {Stack} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const columns = [
    {field: 'id', headerName: 'ID', type: 'number', width: 10, align: "right"},
    {field: 'left', headerName: 'Left', width: 300, align: "right"},
    {field: 'term', headerName: 'Term', width: 100, align: "center"},
    {field: 'right', headerName: 'Right', width: 300, align: "left"}
];

const Concordance = (props) => {
    const [concordanceList, setConcordanceList] = React.useState([])
    const [keyword, setKeyword] = React.useState("");
    const [width, setWidth] = React.useState(80);
    const [widthItem, setWidthItem] = React.useState([])

    React.useEffect(() => {
        getConcordanceList();
        setupSelectItem();
    }, [props.tokens, props.keyword, keyword, width])

    const getConcordanceList = () => {
        GetConcordanceList(props.tokens, width)
            .then((data) => {
                setupConcordanceList(data.data)
            })
            .catch(error => {
                props.setAlertMessage(`setup concordance list: ${error}`)
            })
    };

    const handleTextChange = (event) => {
        setKeyword(event.target.value);
    }

    const reIndex = (concordanceList) => {
        return concordanceList.map((concordance, index) => {
            return {
                "id": index + 1
                , "left": concordance.left
                , "term": concordance.term
                , "right": concordance.right
            }
        });
    }

    const filterConcordanceList = (concordanceList) => {
        return concordanceList.filter((concordance) => {
            return concordance.term === setupKeyword()
        });
    }

    const setupConcordanceList = (concordanceList) => {
        setConcordanceList(setupKeyword().length > 0 ?
            reIndex(filterConcordanceList(concordanceList)) :
            concordanceList)
    }

    const setupKeyword = () => {
        if (keyword.length <= 0) {
            return props.keyword
        } else {
            return keyword
        }
    }

    const handleChange = (event) => {
        setWidth(event.target.value);
    };

    const setupSelectItem = () => {
        const items = []
        for (let i = 1; i <= 10; i++) {
            items.push(i * 10);
        }

        setWidthItem(items);
    }

    const control =
        <Box sx={{minWidth: 120, m: 1}}>
            <Stack spacing={1} direction="row">
                <FormControl>
                    <InputLabel id="select-label">Width</InputLabel>
                    <Select
                        labelId="select-label"
                        sx={{minWidth: 100}}
                        value={width}
                        label="Width"
                        onChange={handleChange}
                    >
                        {
                            widthItem.map((item, index) => {
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
                <h4>Concordances</h4>
            </Box>
            {control}
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
                sx={{maxHeight: 400}}
            />
        </>
    );
}
export default Concordance;