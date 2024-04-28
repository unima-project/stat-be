import * as React from "react";
import {Container} from '@mui/material';
import routes from './Router';
import {MainMenu} from './components/Menu';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Loading} from "./components/commons/Loading";
import {createContext} from "react";

export const CommonContext = createContext(null);


function App() {
    const [loading, setLoading] = React.useState(false);

    return (
        <CommonContext.Provider value={{loading, setLoading}}>
        <BrowserRouter basename='/'>
            <Loading open={loading}/>
            <MainMenu/>
            <Container>
                <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
                </Routes>
            </Container>
        </BrowserRouter>
        </CommonContext.Provider>
    );
}

export default App;