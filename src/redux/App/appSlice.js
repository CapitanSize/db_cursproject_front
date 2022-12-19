import {createSlice} from "@reduxjs/toolkit";
import {ordersArr} from "./consts";
import photo from '../../static/images/myPhoto.jpg'


const initialState = {
    orders: [],
    user: {},
    isAuth: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        getOrders: (state) => {
            state.orders = ordersArr
        },
        login: (state) => {
            state.isAuth = true
            state.user = {
                id: 1,
                username: 'Daniil',
                email: 'daniil_akimov_2002@mail.ru',
                photoUrl: photo,
                rate: 3.4,
            }

        },
        registration: (state) => {

        }
    }
})

export const {getOrders, login, registration} = appSlice.actions

export default appSlice.reducer