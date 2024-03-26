import React from 'react';
import {GetUserProfile, userType} from "../models";
import {SetupCookies} from "./cookie";


export const UserProfile = () => {
    const {cookie} = SetupCookies();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(false);
    const [isMember, setIsMember] = React.useState(false);

    React.useEffect(() => {
        if (cookie.token) {
            getUserProfile().then()
        } else {
            setIsAdmin(false);
            setIsLogin(false);
            setIsMember(false);
        }
    }, [cookie, isAdmin, isLogin, isMember])
    const getUserProfile = async () => {
        try {
            const data = await GetUserProfile(cookie.token);
            setIsAdmin(data.data.user_type === userType.USER_ADMIN.value);
            setIsMember(data.data.user_type === userType.USER_MEMBER.value);
            setIsLogin(true);

            return data
        } catch (error) {
            return error
        }
    }

    return {getUserProfile, isAdmin, isLogin, isMember};
}

