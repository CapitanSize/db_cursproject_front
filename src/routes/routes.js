import {AUTH_ROUTE, LOGIN_ROUTE, MY_ORDERS_ROUTE, ORDER_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE} from "./consts";
import MainPage from "../components/pages/mainPage/MainPage";
import LoginPage from "../components/pages/loginPage/LoginPage";
import RegistrationPage from "../components/pages/registrationPage/RegistrationPage";
import ProfilePage from "../components/pages/profilePage/ProfilePage";
import OrderPage from "../components/pages/orderPage/OrderPage";
import MyOrdersPage from "../components/pages/myOrdersPage/MyOrdersPage";

export const publicRoutes = [
    /*{
        path: ORDERS_ROUTE,
        element: <MainPage/>
    },*/
    {
        path: LOGIN_ROUTE,
        element: <LoginPage/>
    },
    {
        path: AUTH_ROUTE,
        element: <RegistrationPage/>
    },
    /*{
        path: ORDER_ROUTE + '/:id',
        element: <OrderPage />
    },*/
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
    /*{
        path: LOGIN_ROUTE,
        element: <LoginPage/>
    },
    {
        path: AUTH_ROUTE,
        element: <RegistrationPage/>
    },*/
    {
        path: ORDER_ROUTE + '/:id',
        element: <OrderPage/>
    },
    {
        path: MY_ORDERS_ROUTE,
        element: <MyOrdersPage/>
    },
]