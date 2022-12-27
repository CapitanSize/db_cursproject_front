import React, {useEffect} from 'react';
import {Route, Routes, useNavigate, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrdersThunk, getOrderTypesThunk, refreshLoginThunk} from "../redux/App/appSlice";

const AppRouter = () => {

    const isAuth = useSelector(state => state.app.isAuth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(refreshLoginThunk())
        dispatch(fetchOrdersThunk())
        dispatch(getOrderTypesThunk())
    }, [])


    return (
        <Routes>
            {isAuth
                ?
                <>
                {
                privateRoutes.map((route) =>
                    <Route key={route.path} path={route.path} element={route.element}/>
                )}
                    <Route path={'*'} element={<Navigate to={'/'} replace/>}  />
                </>
                :
                <>
                {publicRoutes.map((route) =>
                        <Route key={route.path} path={route.path} element={route.element}/>
                    )}
                    <Route path={'*'} element={<Navigate to={'/login'} replace/>}  />
                </>
            }
        </Routes>
    );
};

export default AppRouter;