import {apiMethod, HitApi} from "./index";

export const ApiAuth = () => {
    const AuthLogin = async (auth) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/auth/login'
                , data: auth
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const AuthLogout = async (token) => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/auth/logout'
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
        AuthLogin
        , AuthLogout
    }
}
