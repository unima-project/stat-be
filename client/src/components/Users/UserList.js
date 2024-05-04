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
import EditNoteIcon from '@mui/icons-material/EditNote';
import {Button, Stack} from "@mui/material";
import {userTypeConfig, userStatus} from "../../models";
import Switch from '@mui/material/Switch';
import {userAction} from './index';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import {userTypeItems} from "../../models";
import FormControl from "@mui/material/FormControl";


export const UserList = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);

    const userStatusConfig = {
        0: {label: userStatus.USER_INACTIVE.label}
        , 1: {label: userStatus.USER_ACTIVE.label}
    }

    const columns = [
        {id: 'no', label: 'No', minWidth: 5}
        , {id: 'user_type', label: 'Type', minWidth: 25}
        , {id: 'name', label: 'Name', minWidth: 50}
        , {id: 'email', label: 'Email', minWidth: 50}
        , {id: 'noKtp', label: 'No.KTP', minWidth: 20}

        , {id: 'noHp', label: 'No.HP', minWidth: 20}
        , {id: 'address', label: 'Address', minWidth: 100}
        , {id: 'reason', label: 'Reason', minWidth: 20}
        , {id: 'status', label: 'Status', minWidth: 10}
        , {id: 'action', label: '', minWidth: 20}
    ];

    const header = [{id:1, columns: columns}];

    React.useEffect(() => {
        if (props.userList) setRowData();
    }, [props.userList])

    const typeOnChange = (event, user) => {
        const typeSelect = event.target.value;
        user.user_type = typeSelect;
        props.setConfirmationConfig({
            open: true
            , title: "Update User"
            , okFunction: () => {
                props.updateUser(user);
            }
            , content: `Are you sure want to set user ${user.name} as ${userTypeConfig[typeSelect].label} ?`
        });
    }
    const statusOnChange = (event, user) => {
        const checked = event.target.checked ? 1 : 0;
        user.status = checked;
        props.setConfirmationConfig({
            open: true
            , title: "Update User"
            , okFunction: () => {
                props.updateUser(user);
            }
            , content: `Are you sure want to set ${userStatusConfig[checked].label} user ${user.name} ?`
        });
    }

    const userTypeControl = (user) => {
        return (
            <FormControl
                sx={{minWidth: 130}}
                size="small"
                disabled={props.userId === user.id}
            >
                <Select
                    value={user.user_type}
                    onChange={(event) => {
                        typeOnChange(event, user)
                    }}
                >
                    {
                        userTypeItems().map((item, index) => {
                            return (
                                <MenuItem value={item.value} key={index}>

                                    <Stack direction="row" spacing={1} alignItems={"center"}>
                                        <Typography color={item.color}>{item.icon(16)}</Typography>
                                        <Typography fontSize="10pt" color={item.color}>{item.label}</Typography>
                                    </Stack>
                                </MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
        )
    }

    const setRowDataOrder = () => {
        const currentUser = props.userList.filter((user) => {
            return user.id === props.userId
        })

        const otherUser = props.userList.filter((user) => {
            return user.id !== props.userId
        })

        return currentUser.concat(otherUser)
    }

    const setRowData = () => {
        setRows(setRowDataOrder().map((user, index) => {
            return {
                no: index + 1
                , user_type: userTypeControl(user)
                , name: user.name.split(" ")[0]
                , email: `${user.email.split("@")[0]}@ ...`
                , noKtp: `${user.no_ktp.substring(0, 5)} ...`

                , noHp: `${user.no_hp.substring(0, 5)} ...`
                , address: `${user.address.substring(0, 10)} ...`
                , reason: `${user.reason.substring(0, 10)} ...`
                , status: <Switch
                    disabled={props.userId === user.id}
                    checked={user.status}
                    onChange={(event) => {
                        statusOnChange(event, user);
                    }}
                />
                , action: <Stack direction="row" spacing={1}>
                    <Button
                        disabled={props.userId === user.id}
                        size="small"
                        variant="outlined"
                        component="label"
                        color="error"
                        onClick={() => props.setConfirmationConfig({
                            open: true
                            , title: "Delete User"
                            , okFunction: () => {
                                props.deleteUser(user.id)
                            }
                            , content: `Are you sure want to delete user ${user.name} ?`
                        })}
                    ><DeleteForeverIcon/>
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        component="label"
                        color="primary"
                        onClick={() => {
                            props.handleModalOpen({
                                title: userAction.EDIT_USER
                                , data: user
                            });
                        }}
                    ><EditNoteIcon/>
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

    const tableListUser = <>
        <TableContainer sx={{maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    {
                        header.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    {row.columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth, backgroundColor: "#378CE7", color: "white"}}
                                        >{column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })
                    }
                </TableHead>
                <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                                <TableRow hover key={row.code}>
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
    </>

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            {tableListUser}
        </Paper>
    );
}