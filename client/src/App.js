import * as React from "react";
import {Container} from '@mui/material';
import routes from './Router';
import {MainMenu} from './components/Menu';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
    return (
        <BrowserRouter basename='/'>
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
    );
}

export default App;