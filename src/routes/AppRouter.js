import React from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";
import {useSelector} from "react-redux";

const AppRouter = () => {

    const isAuth = useSelector(state => state.app.isAuth)


    return (
        <Routes>
            {isAuth
                ?
                privateRoutes.map((route) =>
                    <Route key={route.path} path={route.path} element={route.element}/>
                )
                :
                publicRoutes.map((route) =>
                    <Route key={route.path} path={route.path} element={route.element}/>
                )
            }
        </Routes>
    );
};

export default AppRouter;