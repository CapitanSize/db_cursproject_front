import {AUTH_ROUTE, LOGIN_ROUTE, MY_ORDERS_ROUTE, ORDER_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE} from "./consts";
import MainPage from "../components/pages/mainPage/MainPage";
import LoginPage from "../components/pages/loginPage/LoginPage";
import RegistrationPage from "../components/pages/registrationPage/RegistrationPage";
import ProfilePage from "../components/pages/profilePage/ProfilePage";
import OrderPage from "../components/pages/orderPage/OrderPage";
import MyOrdersPage from "../components/pages/myOrdersPage/MyOrdersPage";
import AllExecutorsPage from "../components/pages/allExecutorsPage/AllExecutorsPage";
import ExecutorPage from "../components/pages/profilePage/executorProfilePage/ExecutorPage";
import ExecutorsNotificationPage
    from "../components/pages/profilePage/ExecutorsNotificationPage/ExecutorsNotificationPage";
import InProgressOrdersPage from "../components/pages/InProgressOrders/InProgressOrdersPage";

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
    {
        path: '/allExecutors',
        element: <AllExecutorsPage/>
    },
    {
        path: '/executor/:id',
        element: <ExecutorPage/>
    },
    {
        path: '/executor/:id/:orderId',
        element: <ExecutorsNotificationPage/>
    },
    {
        path: '/progressOrders',
        element: <InProgressOrdersPage/>
    }
]