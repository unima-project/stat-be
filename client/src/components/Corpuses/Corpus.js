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
import Switch from "@mui/material/Switch";
import {corpusPublicStatusConfig, userType, userTypeConfig} from "../../models";
import VisibilityIcon from '@mui/icons-material/Visibility';

const columnConfig = {
    ID: {
        id: 'id'
        , label: 'Id'
        , minWidth: 10
    }
    , CORPUS: {
        id: 'corpus'
        , label: 'Corpus'
        , minWidth: 50
    }
    , PUBLIC: {
        id: 'public'
        , label: 'Public'
        , minWidth: 10
    }
    , CREATED_AT: {
        id: 'created_at'
        , label: 'Created At'
        , minWidth: 10
    }
    , ACTION: {
        id: 'action'
        , label: ''
        , minWidth: 10
    }
}

const columnPublicConfig = {
    ID: {
        id: 'id'
        , label: 'Id'
        , minWidth: 10
    }
    , CORPUS: {
        id: 'corpus'
        , label: 'Corpus'
        , minWidth: 50
    }
    , CREATED_AT: {
        id: 'created_at'
        , label: 'Created At'
        , minWidth: 10
    }
    , ACTION: {
        id: 'action'
        , label: ''
        , minWidth: 10
    }
}

const rowsPerPageOptions = [5, 10, 25, 50];

export const CorpusList = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState([]);

    React.useEffect(() => {
        setRowData();
        setupCurrentColumn();
    }, [props.corpusList])

    const setupCurrentColumn = () => {
        const currentColumns = props.userLevel === userType.USER_PUBLIC ? columnPublicConfig : columnConfig
        setupColumn(currentColumns);
    }

    const setupColumn = (cols) => {
        const columnList = [];

        for (const col in cols) {
            columnList.push({
                id: columnConfig[col].id
                , label: columnConfig[col].label
                , minWidth: columnConfig[col].minWidth
            })
        }

        setColumns(columnList);
    }

    const handleDeleteCorpus = (corpusId) => {
        props.setConfirmationConfig({
            open: true
            , title: "Delete Corpus"
            , okFunction: () => props.deleteCurrentCorpus(corpusId)
            , content: `Are you sure want to delete the corpus ?`
        });
    }

    const handleLoadCorpus = (corpusId, isDownload) => {
        let content = `Are you sure want to load the corpus ?`
        if (isDownload) {
            content = `Are you sure want to download the token list ?`
        }

        props.setConfirmationConfig({
            open: true
            , title: "Load Corpus"
            , okFunction: () => {
                props.loadCurrentCorpus(corpusId, isDownload);
                if (props.isMember) {
                    props.handleModalClose();
                }
            }
            , content: content
        });
    }

    const publicOnChange = (event, corpus) => {
        const checked = event.target.checked ? 1 : 0;
        corpus.public = checked;
        props.setConfirmationConfig({
            open: true
            , title: "Update Corpus"
            , okFunction: () => {
                props.updateCurrentCorpus(corpus);
            }
            , content: `Are you sure want to set ${corpusPublicStatusConfig[checked].label} ?`
        });
    }

    const actionButton = (prop) => {
        return <Button
            size="small"
            variant="outlined"
            component="label"
            color={prop.color}
            onClick={prop.action}
        >{prop.icon}</Button>
    }

    const deleteCorpusButton = (corpusId) => {
        return actionButton({
            color: "error"
            , action: () => handleDeleteCorpus(corpusId)
            , icon: <DeleteForeverIcon/>
        });
    }

    const loadCorpusButton = (corpusId) => {
        return actionButton({
            color: "primary"
            , action: () => handleLoadCorpus(corpusId, false)
            , icon: <VisibilityIcon/>
        })
    }

    const printCorpusTokenButton = (corpusId) => {
        return actionButton({
            color: "success"
            , action: () => handleLoadCorpus(corpusId, true)
            , icon: <DownloadIcon/>
        })
    }

    const setupActionButtonList = (userLevel, corpusId) => {
        switch (userLevel) {
            case userType.USER_ADMIN:
                return [deleteCorpusButton(corpusId)];
            case userType.USER_MEMBER:
                return [
                    loadCorpusButton(corpusId)
                    , printCorpusTokenButton(corpusId)
                    , deleteCorpusButton(corpusId)
                ]
            default:
                return [
                    loadCorpusButton(corpusId)
                    , printCorpusTokenButton(corpusId)
                ]
        }
    }

    const setRowData = () => {
        setRows(props.corpusList.map((corpus, index) => {
            return {
                id: index + 1
                , corpus: corpus.corpus
                , public: <Switch
                    checked={corpus.public}
                    onChange={(event) => {
                        publicOnChange(event, corpus);
                    }}
                />
                , created_at: corpus.created_at
                , action: <Stack direction="row" spacing={2}>
                    {
                        setupActionButtonList(props.userLevel, corpus.id).map(button => {
                            return button
                        })
                    }
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
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
        ;
}