import {Home} from './components/Home';
import {Tool} from './components/Tools';
import {ErrorPage} from './components/commons/ErrorPage';
import {Login} from './components/Auths';
import {UserProfile} from './components/Users/UserProfile';
import {User} from './components/Users';

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: '/tools',
        element: <Tool />
    },
    {
        path: '/auth/login',
        element: <Login />
    },
    {
        path: '/users/profile',
        element: <UserProfile />
    },
    {
        path: '/users',
        element: <User />
    }
];

export default routes;
