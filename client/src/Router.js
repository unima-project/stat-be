import {Home} from './components/Home';
import {Tool} from  './components/Tool';
import {ErrorPage} from './components/ErrorPage';
import {Login} from './components/Auths';
import {Corpus} from './components/Corpuses';
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
        path: '/tools/:corpusId',
        element: <Tool />
    },
    {
        path: '/auth/login',
        element: <Login />
    },
    {
        path: '/corpuses',
        element: <Corpus />
    },
    {
        path: '/users/profile',
        element: <UserProfile />
    }
];

export default routes;
