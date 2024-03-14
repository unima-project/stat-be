import axios from "axios";
import {baseUrl} from "./index";

export const AuthLogin = async (auth) => {
    try {
        const {data} = await axios.post(baseUrl + '/auth/login', auth)
        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const AuthLogout = async (auth) => {
    try {
        const {data} = await axios.get(baseUrl + '/auth/logout', {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        return data
    } catch (error) {
        throw error.response.data.message;
    }
}
