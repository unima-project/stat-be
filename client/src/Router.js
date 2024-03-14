import {Home} from './components/Home';
import {Tool} from  './components/Tool';
import {ErrorPage} from './components/ErrorPage';
import {Login} from './components/Auths';
import {UserProfile} from './components/Users/Profile';

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
    }
];

export default routes;
