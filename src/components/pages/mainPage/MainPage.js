import React from 'react';
import OrderList from "../../order/OrderList";
import Grid from "@mui/material/Grid";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import styles from './MainPage.module.css'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    getOrders,
    getOrdersByType,
    getOrderTypesThunk
} from "../../../redux/App/appSlice";

export const buttons = [
    'Все',
    'Деталь',
    'Чертеж',
    'Механизм',
    'Аппарат',
]

const MainPage = () => {

    const [type, setType] = useState(null)
    const orders = useSelector(state => state.app.orders)
    const types = useSelector(state => state?.app?.orderTypes?.types)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders())
        dispatch(getOrderTypesThunk())
    }, [])

    useEffect(() => {
        type && dispatch(getOrdersByType({type: type}))
    }, [type])

    console.log(types)




    return (
        <Grid>
            <div>
                <OrderList orders={orders} />
            </div>
            <Grid className={styles.radioWrapper}>
                <RadioButtonGroup types={types} type={type} setType={setType}/>
            </Grid>
        </Grid>
    );
};

export default MainPage;