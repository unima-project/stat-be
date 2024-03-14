import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from '@mui/icons-material/Download';
import {Button, Stack} from "@mui/material";

export const CorpusList = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);

    const columns = [
        {id: 'id', label: 'Id', minWidth: 10},
        {id: 'text', label: 'Text', minWidth: 50},
        {id: 'created_at', label: 'Created At', minWidth: 10},
        {id: 'action', label: '', minWidth: 10},
    ];


    React.useEffect(() => {
        setRowData();
    }, [props.corpusList])

    const setRowData = () => {
        setRows(props.corpusList.map((corpus, index) => {
            return {
                id: index + 1
                , text: corpus.corpus
                , created_at: corpus.created_at
                , action: <Stack direction="row" spacing={2}>
                    <Button
                        size="small"
                        variant="outlined"
                        component="label"
                        color="error"
                        onClick={() => props.deleteCurrentCorpus(corpus.id)}
                    ><DeleteForeverIcon/>
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        component="label"
                        color="primary"
                        onClick={() => {
                            props.loadCurrentCorpus(corpus.id);
                            props.handleModalClose();
                        }}
                    ><DownloadIcon/>
                    </Button>
                </Stack>
            }
        }));
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth, backgroundColor: "#378CE7", color: "white"}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}