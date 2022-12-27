import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {getOrderTypesThunk, refreshLoginThunk} from "../redux/App/appSlice";

const AppRouter = () => {

    const isAuth = useSelector(state => state.app.isAuth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(refreshLoginThunk())
        dispatch(getOrderTypesThunk())
        !isAuth && navigate('/login')
    }, [])


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