import {createSlice} from "@reduxjs/toolkit";
import {ordersArr, url} from "./consts";
import photo from '../../static/images/myPhoto.jpg'
import axios from 'axios'


const initialState = {
    orders: [],
    executorDoneOrders: [],
    orderTypes: [],
    user: {},
    userType: null,
    isAuth: false,
    registrationSuccess: null,
    registrationError: null,
    loginSuccess: null,
    loginError: null,
    fetchingOrdersError: null,
    currentCustomer: null,
    currentCustomerOrders: [],
    currentExecutor: null,
    error: null,

}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        getOrders: (state, action) => {
            state.orders = ordersArr
            /*state.orders = action.payload.orders
            state.fetchingOrdersError = action.payload.error*/
        },
        getOrdersByType: (state, action) => {
          /*state.orders = action.payload.orders
          state.fetchingOrdersError = action.payload.error*/
            state.orders = ordersArr.filter((order) => order.type == action.payload.type)
        },
        login: (state, action) => {
            state.user = action.payload.user
            state.loginError = action.payload.error
            state.loginSuccess = action.payload.success
            state.isAuth = action.payload.success
            state.userType = action.payload.userType
            localStorage.setItem('token', action.payload.token)
        },
        registration: (state, action) => {
            state.registrationSuccess = action.payload.response
            state.registrationError = action.payload.error
        },
        removeLoginError: (state) => {
            state.loginError = null
        },
        logout: (state) => {
            localStorage.clear()
            state.user = {}
            state.isAuth = false
            state.registrationSuccess = null
            state.registrationError = null
            state.loginSuccess = null
            state.loginError = null
        },
        refreshAccessToken: (state) => {
            const token = localStorage.getItem('token')
        },
        changeProfilePhoto: (state, action) => {
            state.user.photo_url = action.payload.photo
        },
        getCustomer: (state, action) => {
            state.currentCustomer = action.payload.customer
            state.error = action.payload.error
        },
        getExecutor: (state, action) => {
            state.currentExecutor = action.payload.executor
            state.error = action.payload.error
        },
        getCustomerOrders: (state, action) => {
            state.currentCustomerOrders = action.payload.orders
            state.error = action.payload.error
        },
        setExecutorDoneOrders: (state, action) => {
            state.executorDoneOrders = action.payload.orders
            state.error = action.payload.error
        },
        createOrder: (state, action) => {
          state.orders.push(action.payload.order)
          state.error = action.payload.error
        },
        getOrderTypes: (state, action) => {
            state.orderTypes = action.payload.types
            state.error = action.payload.error
        }
    }
})

export const registrationThunk = (user, userType) => async (dispatch) => {
    try {
        const response = await axios.post(`http://127.0.0.1:5000/${userType}/?email=${user.email}&password=${user.password}&name=${user.name}
            &second_name=${user.second_name}&birth_date=${user.birth_date}
            &phone_number=${user.phone_number}&country=${user.country}&city=${user.city}`,
            '')
        dispatch(registration({
            response: response.data.status,
            error: null,
        }))
    } catch (e) {
        dispatch(registration({
            response: null,
            error: e.message,
        }))
    }

}

export const loginThunk = (user, userType) => async (dispatch) => {
    try{
        const response = await axios.get(`${url}/${userType}/login?email=${user.email}&password=${user.password}`)
        dispatch(login({
            token: response.data.access_token,
            user: response.data.user,
            error: null,
            success: true,
            userType: userType,
        }))
    } catch (e) {
        dispatch(login({
            token: '',
            user: {},
            error: 'Вход не удался, проверьте правильность введеных параметров',
            success: null,
            userType: userType,
        }))
    }
}

export const fetchOrdersThunk = (userType) => async (dispatch) => {
    try {
        const response = await axios.get(`${url}/${userType}/orders`)
        dispatch(getOrders({
            orders: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(getOrders({
            orders: [],
            error: 'При загрузке заказов произошла ошибка попробуйте еще раз позднее'
        }))
    }
}

export const fetchOrdersByTypeThunk = (userType, ordersType) => async (dispatch) => {
    try {
        const response = await axios.get(`${url}/${userType}/orders/${ordersType}`)
        dispatch(getOrdersByType({
            orders: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(getOrdersByType({
            orders: [],
            error: 'При загрузке заказов произошла ошибка попробуйте еще раз позднее'
        }))
    }
}

export const getCustomerThunk = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${url}/executor/customer/${id}`)
        dispatch(getCustomer({
            customer: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(getCustomer({
            customer: {},
            error: 'При загрузке заказчика произошла ошибка попробуйте еще раз позднее'
        }))
    }
}

export const getExecutorThunk = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${url}/customer/executor/${id}`)
        dispatch(getExecutor({
            executor: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(getExecutor({
            executor: {},
            error: 'При загрузке исполнителя произошла ошибка попробуйте еще раз позднее'
        }))
    }
}

export const getCustomerOrdersThunk = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${url}/executor/customer/${id}/orders`)
        dispatch(getCustomerOrders({
            orders: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(getCustomerOrders({
            orders: [],
            error: 'При загрузке заказов заказчика произошла ошибка попробуйте еще раз позднее'
        }))
    }
}

export const getExecutorDoneOrdersThunk = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/executor/order/done/`, {
            headers: {
                authorisation : token
            }
        })
        dispatch(setExecutorDoneOrders({
            orders: response.data,
            error: null,
        }))
    } catch (e) {
        dispatch(setExecutorDoneOrders({
            orders: [],
            error: 'При загрузке ваших заказов произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const createOrderThunk = (order) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.post(`${url}/customer/order?title=${order.title}&description=${order.description}&files=${order.files}&price=${order.price}&type=${order.type}`,
            '', {
            headers: {
                authorisation: token,
            }
            })
        dispatch(createOrder({
            order: response.data,
            error: null,
        }))
    } catch (e) {
        dispatch(createOrder({
            order: null,
            error: 'При создании заказа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const getOrderTypesThunk = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/executor/types`, {
            headers: {
                authorisation : token
            }
        })
        dispatch(getOrderTypes({
            types: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(getOrderTypes({
            types: [],
            error: 'При загрузке типов произошла ошибка попробуйте еще раз позднее',
        }))
    }
}



export const {
    getOrders,
    login,
    registration,
    removeLoginError,
    logout,
    changeProfilePhoto,
    getOrdersByType,
    getCustomer,
    getExecutor,
    getCustomerOrders,
    setExecutorDoneOrders,
    createOrder,
    getOrderTypes
} = appSlice.actions

export default appSlice.reducer