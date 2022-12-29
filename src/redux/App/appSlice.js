import {createSlice} from "@reduxjs/toolkit";
import {ordersArr, url} from "./consts";
import photo from '../../static/images/myPhoto.jpg'
import axios from 'axios'


const initialState = {
    orders: [],
    statuses: ['search', 'progress', 'done', 'review'],
    executorDoneOrders: [],
    customerPublishedOrders: [],
    currentOrder: {},
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
    currentExecutor: {},
    error: null,
    executorPerformedOrders: [],
    executorsList: [],
    customerResponse: [],
    customerNotifications: [],
    executorNotifications: [],
    approvedExecutors: [],
    executorPerformances: [],
    customerCurrentOrderStatus: null,
    executorCurrentOrderStatus: null,
    executorInProgressOrders: [],
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        getOrders: (state, action) => {
            state.orders = action?.payload?.orders
            state.fetchingOrdersError = action?.payload?.error
        },
        getOrdersByType: (state, action) => {
          state.orders = action?.payload?.orders
          state.fetchingOrdersError = action?.payload?.error
        },
        getOneOrder: (state, action) => {
          state.currentOrder = action?.payload?.order
          state.error = action?.payload?.error
        },
        login: (state, action) => {
            state.user = action.payload.user
            state.loginError = action.payload.error
            state.loginSuccess = action.payload.success
            state.isAuth = action.payload.success
            state.userType = action.payload.userType
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('userType', action.payload.userType)
        },
        refreshLogin: (state, action) => {
            state.user = action.payload.user
            state.isAuth = true
            state.userType = localStorage.getItem('userType')
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
        },
        customerOrderList: (state, action) => {
            state.customerPublishedOrders = action?.payload?.orders
            state.error = action?.payload?.error
        },
        performExecutor: (state, action) => {
            state.executorPerformedOrders.push(action.payload.order)
            state.error = action.payload.error
        },
        getAllExecutors: (state, action) => {
          state.executorsList = action.payload.executorsList
          state.error = action.payload.error
        },
        fetchCustomerResponse: (state, action) => {
            state.customerResponse = [...state.customerResponse, action.payload.response]
            state.error = action.payload.error
        },
        fetchCustomerNotifications: (state, action) => {
            state.customerNotifications = action.payload.customerNotifications
            state.error = action.payload.error
        },
        approvedExecutors: (state, action) => {
            state.approvedExecutors.push(action.payload.executor)
            state.error = action.payload.error
        },
        setErrorNull: (state) => {
            state.error = null
        },
        getExecutorPerformances: (state, action) => {
            state.executorPerformances = action.payload.response
            state.error = action.payload.error
        },
        fetchOrderStatusCustomer: (state, action) => {
            state.customerCurrentOrderStatus = action.payload.status
            state.error = action.payload.error
        },
        changeOrderStatusCustomer: (state, action) => {
          state.currentOrderStatus = action.payload.status
          state.error = action.payload.error
        },
        fetchOrderStatusExecutor: (state, action) => {
            state.executorCurrentOrderStatus = action.payload.status
            state.error = action.payload.error
        },
        fetchExecutorInProgressOrders: (state, action) => {
            state.executorInProgressOrders = action.payload.orders
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

export const fetchOrdersThunk = () => async (dispatch) => {
    try {
        const response = await axios.get(`${url}/executor/orders`)
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

export const fetchOrdersByTypeThunk = (ordersType) => async (dispatch) => {
    try {
        const response = await axios.get(`${url}/executor/orders?type=${ordersType}`)
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
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/customer/executor/${id}`, {
            headers: {
                authorisation: token
            }
        })
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

export const refreshLoginThunk = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const userType = localStorage.getItem('userType')
        const response = await axios.get(`${url}/${userType}/refresh`, {
            headers: {
                authorisation: token
            }
        })
        dispatch(refreshLogin({
            user: response.data
        }))
    } catch (e) {
        if (e.response.status === 401){
            dispatch(logout())
        }
    }
}

export const customerOrdersListThunk = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/customer/order/list`, {
            headers: {
                authorisation : token
            }
        })
        dispatch(customerOrderList({
            orders: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(customerOrderList({
            orders: [],
            error: 'При загрузке ваших заказов произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const fetchOneOrderThunk = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/executor/order/${id}`, {
            headers: {
                authorisation : token
            }
        })
        dispatch(getOneOrder({
            order: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(getOneOrder({
            order: {},
            error: 'При загрузке заказа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const performExecutorThunk = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${url}/executor/order/${id}/performed`, '', {
            headers: {
                authorisation : token
            }
        })
        dispatch(performExecutor({
            order: {id: id},
            error: null
        }))
    } catch (e) {
        dispatch(performExecutor({
            order: {},
            error: 'При загрузке заказа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const fetchAllExecutors = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/customer/executors/list`, {
            headers: {
                authorisation : token
            }
        })
        dispatch(getAllExecutors({
            executorsList: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(getAllExecutors({
            executorsList: [],
            error: 'При загрузке заказа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const fetchCustomerResponseThunk = (orderId) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/executor/customer_response?order_id=${orderId}`, {
            headers: {
                authorisation : token
            }
        })
        dispatch(fetchCustomerResponse({
            response: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(fetchCustomerResponse({
            executorsList: [],
            error: 'При загрузке ответа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const fetchCustomerNotificationsThunk = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/customer/executor_performances`, {
            headers: {
                authorisation : token
            }
        })
        dispatch(fetchCustomerNotifications({
            customerNotifications: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(fetchCustomerNotifications({
            customerNotifications: [],
            error: 'При загрузке ответа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const approveExecutorThunk = (orderId, executorId) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.post(`${url}/customer/order/${orderId}/approve?executor_id=${executorId}`, '', {
            headers: {
                authorisation: token
            }
        })
    } catch (e) {
    }
}

export const rejectExecutorThunk = (orderId, executorId) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.post(`${url}/customer/order/${orderId}/reject?order_id=${orderId}&executor_id=${executorId}`, '', {
            headers: {
                authorisation: token
            }
        })
    } catch (e) {
    }
}

export const getExecutorPerfrmancesThunk = () => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/executor/performances`,  {
            headers: {
                authorisation: token
            }
        })
        dispatch(getExecutorPerformances({
            response: response.data,
            error: null,
        }))
    } catch (e) {
        dispatch(getExecutorPerformances({
            response: [],
            error: 'При загрузке откликов произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const deleteOrderThunk = (orderId) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.delete(`${url}/customer/order/${orderId}/delete`,  {
            headers: {
                authorisation: token
            }
        })
    } catch (e) {
    }
}

export const fetchCustomerOrderStatusThunk = (orderId) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/customer/order/${orderId}/status`,  {
            headers: {
                authorisation: token
            }
        })
        dispatch(fetchOrderStatusCustomer({
            status: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(fetchOrderStatusCustomer({
            status: null,
            error: 'При загрузке статуса заказа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const changeOrderStatusThunk = (orderId, status) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.post(`${url}/customer/order/${orderId}/status/update?status=${status}`,'',  {
            headers: {
                authorisation: token
            }
        })
        dispatch(changeOrderStatusCustomer({
            status: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(changeOrderStatusCustomer({
            status: null,
            error: 'При загрузке статуса заказа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const fetchExecutorOrderStatusThunk = (orderId) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/executor/order/${orderId}/status`,  {
            headers: {
                authorisation: token
            }
        })
        dispatch(fetchOrderStatusExecutor({
            status: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(fetchOrderStatusExecutor({
            status: null,
            error: 'При загрузке статуса заказа произошла ошибка попробуйте еще раз позднее',
        }))
    }
}

export const fetchExecutorInProgressOrdersThunk = () => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/executor/order/in_progress/`,  {
            headers: {
                authorisation: token
            }
        })
        dispatch(fetchExecutorInProgressOrders({
            orders: response.data,
            error: null
        }))
    } catch (e) {
        dispatch(fetchExecutorInProgressOrders({
            orders: [],
            error: 'При загрузке заказов произошла ошибка попробуйте еще раз позднее',
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
    getOrderTypes,
    refreshLogin,
    customerOrderList,
    getOneOrder,
    performExecutor,
    getAllExecutors,
    fetchCustomerResponse,
    fetchCustomerNotifications,
    setErrorNull,
    getExecutorPerformances,
    fetchOrderStatusCustomer,
    changeOrderStatusCustomer,
    fetchOrderStatusExecutor,
    fetchExecutorInProgressOrders
} = appSlice.actions

export default appSlice.reducer