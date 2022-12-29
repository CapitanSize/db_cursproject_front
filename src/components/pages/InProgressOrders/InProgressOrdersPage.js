import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {fetchExecutorInProgressOrdersThunk, getExecutorDoneOrdersThunk} from "../../../redux/App/appSlice";
import Box from "@mui/material/Box";
import styles from "../myOrdersPage/MyOrdersPage.module.css";
import Grid from "@mui/material/Grid";
import MyOrderItem from "../../order/MyOrderItem";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import InProgressOrdersItem from "./InProgressOrdersItem";

const InProgressOrdersPage = () => {

    const dispatch = useDispatch()
    const orders = useSelector(state => state?.app?.executorInProgressOrders)
    const navigate = useNavigate()

    const clickHandler = (id) => {
        navigate(`/order/${id}`)
    }
    const click = () => {
        navigate(`/`)
    }

    useEffect(() => {
        dispatch(fetchExecutorInProgressOrdersThunk())
    }, [])

    console.log((orders && !(orders?.length > 0)))
    return (
        <Box className={styles.boxWrapper}>
            <Grid className={styles.gridWrapper}>
                {orders?.length > 0 && orders.map((order) => {
                    return <InProgressOrdersItem order={order} key={order?.id} clickHandler={clickHandler}/>
                })}
                {(orders && !(orders?.length > 0)) &&
                    <Grid className={styles.emptyOrders}>
                        <Grid>
                            <Typography style={{fontSize: '30px', fontFamily: 'sans-serif'}}>У Вас пока нет текущих заказов.</Typography>
                            <br/>
                            <Typography style={{fontSize: '30px', fontFamily: 'sans-serif'}}>Выполните свой первый заказ!</Typography>
                        </Grid>
                        <Grid>
                            <Button onClick={click} style={{marginTop: '20px'}} variant={'outlined'} color={'success'}>Выполнить</Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Box>
    );
};

export default InProgressOrdersPage;