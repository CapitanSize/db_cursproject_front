import React from 'react';
import OrderList from "../../order/OrderList";
import Grid from "@mui/material/Grid";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import styles from './MainPage.module.css'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getOrders, getOrdersByType} from "../../../redux/App/appSlice";

const MainPage = () => {

    const [type, setType] = useState(null)
    const orders = useSelector(state => state.app.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    useEffect(() => {
        type && dispatch(getOrdersByType({type: type}))
    }, [type])

    const buttons = [
        'Все',
        'Деталь',
        'Чертеж',
        'Механизм',
        'Аппарат',
    ]

    console.log(type)

    return (
        <Grid>
            <div>
                <OrderList orders={orders} />
            </div>
            <Grid className={styles.radioWrapper}>
                <RadioButtonGroup buttons={buttons} type={type} setType={setType}/>
            </Grid>
        </Grid>
    );
};

export default MainPage;