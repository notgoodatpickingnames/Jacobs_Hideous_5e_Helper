import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '../components/Login/Login';
import { useAuth } from '../Utils/auth/auth.context';
import { routes as appRoutes } from './routes';

export function AppRouter() {
    const { user } = useAuth();

    return (
        <Router>
            <>
                <Routes>
                    {
                        appRoutes.map((route, index) => 
                            <Route
                                path={route.path} key={`route_${index}`}
                                element={Boolean(user) ? route.component :<Login />}
                            />
                        )
                    }

                    <Route path={'/'} element={
                        <Navigate to={'/home'}/>
                    }/>
                </Routes>
            </>
        </Router>
    )
}