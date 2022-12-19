import {AUTH_ROUTE, LOGIN_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE} from "./consts";
import MainPage from "../components/pages/mainPage/MainPage";
import LoginPage from "../components/pages/loginPage/LoginPage";
import RegistrationPage from "../components/pages/registrationPage/RegistrationPage";
import ProfilePage from "../components/pages/progilePage/ProfilePage";

export const publicRoutes = [
    {
        path: ORDERS_ROUTE,
        element: <MainPage/>
    },
    {
        path: LOGIN_ROUTE,
        element: <LoginPage/>
    },
    {
        path: AUTH_ROUTE,
        element: <RegistrationPage/>
    },
]

export const privateRoutes = [
    {
        path: PROFILE_ROUTE + '/:id',
        element: <ProfilePage/>
    },
    {
        path: ORDERS_ROUTE,
        element: <MainPage/>
    },
    {
        path: LOGIN_ROUTE,
        element: <LoginPage/>
    },
    {
        path: AUTH_ROUTE,
        element: <RegistrationPage/>
    },
]