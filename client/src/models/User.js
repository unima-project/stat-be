import axios from "axios";
import {baseUrl} from "./index";

export const GetUserProfile = async (auth) => {
    try {
        const {data} = await axios.get(baseUrl + '/users', {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const UpdateUserPassword = async (users, auth) => {
    try {
        const {data} = await axios.patch(baseUrl + '/users/password/update', users, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
}