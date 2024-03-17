import {apiMethod, HitApi, userType, userTypeConfig} from "./index";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";

export const ApiUser = () => {
    const defaultUserData = {
        user_type: 1
        , status: 1
        , name: ""
        , email: ""
        , no_ktp: ""

        , no_hp: ""
        , address: ""
        , reason: ""
    }

    const userType = {
        USER_ADMIN: {
            label: "ADMIN"
            , value: 0
        }
        , USER_MEMBER: {
            label: "MEMBER"
            , value: 1
        }
    }

    const userStatus = {
        USER_INACTIVE: {
            label: "INACTIVE"
            , value: 0
        }
        , USER_ACTIVE: {
            label: "ACTIVE"
            , value: 1
        }
    }

    const userTypeConfig = {
        0: {
            value:userType.USER_ADMIN.value
            , label: userType.USER_ADMIN.label
            , color: "secondary"
            , icon: (iconSize) => {
                return (<AdminPanelSettingsIcon sx={{fontSize: iconSize}}/>)
            }
        }
        , 1: {
            value:userType.USER_MEMBER.value
            , label: userType.USER_MEMBER.label
            , color: "primary"
            , icon: (iconSize) => {
                return (<PersonIcon sx={{fontSize: iconSize}}/>)
            }
        }
    }

    const userTypeItems = () => {
        const items = [];
        for (const value in userTypeConfig) {
            items.push(userTypeConfig[value]);
        }

        return items
    }

    const UpdateUser = async (userData, token) => {
        try {
            const apiRequest = {
                method: apiMethod.PUT
                , url: '/users/update'
                , headers: {
                    Authorization: `Bearer ${token}`
                }
                , data: userData
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const DeleteUser = async (user_id, token) => {
        try {
            const apiRequest = {
                method: apiMethod.DELETE
                , url: `/users/delete?id=${user_id}`
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const GetUserList = async (token) => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/users/list'
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const GetUserProfile = async (token) => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/users'
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const UpdateUserPassword = async (userPassword, token) => {
        try {
            const apiRequest = {
                method: apiMethod.PATCH
                , url: '/users/password/update'
                , data: userPassword
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const CreateUser = async (users, token) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/users/register'
                , data: users
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const ResetUserPassword = async (userId, token) => {
        try {
            const apiRequest = {
                method: apiMethod.PATCH
                , url: `/users/password/reset?id=${userId}`
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    return {
        userType
        , GetUserProfile
        , UpdateUserPassword
        , GetUserList
        , DeleteUser

        , userStatus
        , UpdateUser
        , CreateUser
        , ResetUserPassword
        , userTypeConfig

        , defaultUserData
        , userTypeItems
    }
}