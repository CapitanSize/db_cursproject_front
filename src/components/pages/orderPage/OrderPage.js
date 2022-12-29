import React, {useEffect, useState} from 'react';
import OrderItem from "../../order/OrderItem";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styles from './OrderPage.module.css'
import {
    fetchCustomerOrderStatusThunk, fetchExecutorOrderStatusThunk,
    fetchOneOrderThunk,
    fetchOrderStatusThunk,
    getOneOrder
} from "../../../redux/App/appSlice";
import Grid from "@mui/material/Grid";
import {Button, Divider} from "@mui/material";
import {Item} from "../../Item/Item";
import ChangeStatusModal from "../../modals/ChangeStatusModal";

function OrderPage(props) {

    const {id} = useParams()
    const dispatch = useDispatch()
    const order = useSelector(state => state?.app?.currentOrder)
    const userType = useSelector(state => state?.app?.userType)
    const customerOrders = useSelector(state => state?.app?.customerPublishedOrders)
    const status = useSelector(state => state?.app?.customerCurrentOrderStatus?.status)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchOneOrderThunk(id))
        dispatch(fetchCustomerOrderStatusThunk(id))
        dispatch(fetchExecutorOrderStatusThunk(id))
    }, [])

    const check = () => {
        if (customerOrders){
            return customerOrders.find((item) => id === item?.id)
        }
    }


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
                {(check() && userType === 'customer') && <div><Divider/>
                <Grid>Статус заказчика: {status?.customer_status}</Grid>
                <Divider/>
                <Grid>Статус исполнителя: {status?.executor_status ? status?.executor_status : 'Идёт поиск заказчика'}</Grid>
                    <Button variant={'outlined'} color={'success'} onClick={() => {setOpen(true)}}>Редактировать статус заказа</Button>
                    <ChangeStatusModal id={id} open={open} onClose={() => setOpen(false)} />
                </div>}

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