import {Home} from './components/Home'
import {Tool} from  './components/Tool'
import {ErrorPage} from './components/ErrorPage'

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
];

export default routes;
