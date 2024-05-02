import React from 'react';
import {CorpusList} from "./Corpus";
import Box from '@mui/material/Box';
import {
    DeleteCorpus,
    GetCorpusList,
    GetPublicCorpusList, GetUserList,
    UpdateCorpusPublicStatus,
    userType,
} from "../../models";
import {AlertNotification, alertSeverity, defaultAlertStatus} from "../commons/Alert";
import {SetupCookies} from "../../Helpers/cookie";
import {UserProfile} from "../../Helpers/userProfile"
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {CommonContext} from "../../App";

const defaultUserList = [{id: 0, name: '--- all user ---'}]

export const Corpus = (props) => {
    const [corpusList, setCorpusList] = React.useState([]);
    const {cookie} = SetupCookies();
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const {isMember, isAdmin} = UserProfile();
    const [userLevel, setUserLevel] = React.useState(userType.USER_MEMBER);
    const [userList, setUserList] = React.useState(defaultUserList)
    const [selectedUser, setSelectedUser] = React.useState(0)
    const {setLoading} = React.useContext(CommonContext);

    React.useEffect(() => {
        setupUserLevel();
        if (isAdmin) setupUserList()

        if (cookie.token) {
            GetAllCorpus(selectedUser);
        } else {
            const interval = setupGetCorpusInterval()
            if (props.alertStatus) {
                setAlertStatus(props.alertStatus);
            }

            return () => {
                clearInterval(interval);
            }
        }
    }, [cookie, isMember, isAdmin, userLevel, props.alertStatus, selectedUser])

    const corpusListMemo = React.useMemo(() => {
        return corpusList
    }, [corpusList])

    const setupUserList = () => {
        setLoading(true);
        GetUserList(cookie.token)
            .then(data => {
                const userMemberList = data.data.filter(user => {
                    return user.user_type === userType.USER_MEMBER.value
                }).map(user => {
                    return {id: user.id, name: user.name}
                });

                setUserList(defaultUserList.concat(userMemberList));
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const setupUserLevel = () => {
        setUserLevel(
            isAdmin ? userType.USER_ADMIN
                : isMember ? userType.USER_MEMBER
                    : userType.USER_PUBLIC
        );
    }

    const setupGetCorpusInterval = () => {
        GetCorpus();
        return setInterval(() => {
            GetCorpus();
        }, 5000);
    }

    const GetCorpus = () => {
        setAlertStatus(defaultAlertStatus);
        GetPublicCorpus();
    }

    const GetAllCorpus = (userId) => {
        setLoading(true);
        GetCorpusList(cookie.token, userId)
            .then((data) => {
                setCorpusList(data.data);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const GetPublicCorpus = () => {
        GetPublicCorpusList()
            .then((data) => {
                setCorpusList(data.data);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
    }

    const DeleteCurrentCorpus = (corpus_id) => {
        setLoading(true);
        DeleteCorpus(corpus_id, cookie.token)
            .then(data => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: `${data.message}`
                })
                GetAllCorpus(selectedUser);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const UpdateCurrentCorpus = (corpus) => {
        setLoading(true);
        UpdateCorpusPublicStatus(corpus, cookie.token)
            .then(data => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: `${data.message}`
                })
                GetAllCorpus(selectedUser)
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `${error}`
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const userOnChange = (event) => {
        props.setTokens([]);
        setSelectedUser(event.target.value);
        GetAllCorpus(event.target.value);
    }

    const selectUser = <Box sx={{maxWidth: 250, textAlign: "left", marginBottom: 3}}>
        <FormControl fullWidth>
            <InputLabel>User</InputLabel>
            <Select
                size={"small"}
                value={selectedUser}
                label="User"
                onChange={userOnChange}
            >
                {
                    userList.map((user, index) => {
                        return <MenuItem value={user.id} key={index}>{user.name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    </Box>

    return (<Box>
        {isAdmin ? selectUser : <></>}
        <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
        <CorpusList
            corpusListMemo={corpusListMemo}
            deleteCurrentCorpus={DeleteCurrentCorpus}
            loadCurrentCorpus={props.loadCurrentCorpus}
            handleModalClose={props.handleModalClose}
            setConfirmationConfig={props.setConfirmationConfig}
            updateCurrentCorpus={UpdateCurrentCorpus}
            userLevel={userLevel}
        />
    </Box>);
}