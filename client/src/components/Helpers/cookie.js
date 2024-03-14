import {useCookies} from 'react-cookie';

export const SetupCookies = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['token', 'name']);
    return {
        cookieUserToken: cookie.token
        , cookieUserName: cookie.name
        , setCookie: setCookie
        , removeCookie: removeCookie
    }
}