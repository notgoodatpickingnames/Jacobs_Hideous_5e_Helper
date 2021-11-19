import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { routes as appRoutes } from './routes';

export function AppRouter() {

    return (
        <Router>
            <>
                <Routes>
                    {
                        appRoutes.map(({path, component}, index) => 
                            <Route path={path} key={`route_${index}`} element={component} />
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