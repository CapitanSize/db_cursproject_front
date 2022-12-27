import React, {useEffect} from 'react';
import OrderItem from "../../order/OrderItem";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styles from './OrderPage.module.css'
import {fetchOneOrderThunk, getOneOrder} from "../../../redux/App/appSlice";
import Grid from "@mui/material/Grid";
import {Button, Divider} from "@mui/material";
import {Item} from "../../Item/Item";

function OrderPage(props) {

    const params = useParams()
    const dispatch = useDispatch()
    const order = useSelector(state => state?.app?.currentOrder)
    const userType = useSelector(state => state.app.userType)

    useEffect(() => {
        dispatch(fetchOneOrderThunk(params.id))
    }, [])
    console.log(order)


    return (
        <div className={styles.wrapper}>
            <Item>
                <Grid className={styles.orderName}>{order?.title}</Grid>
                <Divider/>
                <Grid>
                    Тип заказа: {order?.type}
                </Grid>
                <Divider/>
            <Grid className={styles.orderDescription}>Описание заказа: {order?.description}</Grid>
                {userType === 'executor' &&
                    <>
                        <Divider/>
                        <Grid className={styles.bottomWrapper}>
                            <Grid>Ориентировочная сумма: <h3>{order?.price}</h3></Grid>
                            <Grid className={styles.button}>
                                <Button
                                    style={{maxHeight: '50px'}}
                                    variant={'outlined'}
                                    color={'success'}
                                >
                                    Выполнить
                                </Button>
                            </Grid>
                        </Grid>
                    </>}
            </Item>
        </div>
    );
};

export default OrderPage;