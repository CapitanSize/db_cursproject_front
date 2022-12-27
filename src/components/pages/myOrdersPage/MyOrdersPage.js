import React from 'react';
import {useEffect} from "react";
import {getExecutorDoneOrdersThunk} from "../../../redux/App/appSlice";
import {useDispatch, useSelector} from "react-redux";
import MyOrderItem from "../../order/MyOrderItem";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import styles from './MyOrdersPage.module.css'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";

const MyOrdersPage = () => {

    const dispatch = useDispatch()
    const orders = useSelector(state => state?.app?.executorDoneOrders)
    const navigate = useNavigate()

    const clickHandler = (id) => {
        navigate(`/order/${id}`)
    }

    useEffect(() => {
        dispatch(getExecutorDoneOrdersThunk())
    }, [])

    return (
        <Box className={styles.boxWrapper}>
            <Grid className={styles.gridWrapper}>
            {orders.length > 0 && orders.map((order) => {
                return <MyOrderItem order={order} key={order.id} clickHandler={clickHandler}/>
            })}
                {orders.length === 0 &&
                <Grid style={styles.emptyOrders}>
                    <Typography>У Вас пока нет выполенных заказов.</Typography>
                        <br/>
                    <Typography>Выполните свой первый заказ!</Typography>
                    <Grid>
                        <Button variant={'outlined'} color={'success'}>Выполнить</Button>
                    </Grid>
                </Grid>
                }
            </Grid>
        </Box>
    );
};

export default MyOrdersPage;