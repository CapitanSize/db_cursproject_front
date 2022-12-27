import React from 'react';
import OrderList from "../../order/OrderList";
import Grid from "@mui/material/Grid";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import styles from './MainPage.module.css'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    fetchOrdersByTypeThunk,
    fetchOrdersThunk,
    getOrders,
    getOrdersByType,
    getOrderTypesThunk
} from "../../../redux/App/appSlice";
import {Button} from "@mui/material";

const MainPage = () => {

    const [type, setType] = useState(null)
    const orders = useSelector(state => state.app.orders)
    const types = useSelector(state => state?.app?.orderTypes?.types)
    const dispatch = useDispatch()

    useEffect(() => {
        type && dispatch(fetchOrdersByTypeThunk(type))
    }, [type])

    useEffect(() => {
        dispatch(fetchOrdersThunk())
    }, [])

    const buttonClick = () => {
        setType(null)
        dispatch(fetchOrdersThunk())
    }

    console.log(type)




    return (
        <Grid>
            <Grid>
                <OrderList orders={orders} />
            </Grid>
            <Grid className={styles.radioWrapper}>
                <RadioButtonGroup types={types} type={type} setType={setType}/>
                <Grid style={{marginTop: '10px', marginRight: '10px'}}>
                    <Button onClick={buttonClick} variant={'outlined'} color={'success'}>Отменить выбор</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MainPage;