import React, {useEffect} from 'react';
import {Item, ItemCustomer} from "../../Item/Item";
import Grid from "@mui/material/Grid";
import styles from "../../order/OrderItem.module.css";
import {Button, Divider} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderStatusThunk} from "../../../redux/App/appSlice";

const CustomerOrderItem = ({order}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const customerStatus = useSelector(state => state?.app?.currentOrderStatus)
    const orders = useSelector(state => state?.app?.orders)

    const handleClick = () => {
        navigate(`/order/${order.id}`)
    }
    useEffect(() => {
    }, [])

    return (
        <Grid item onClick={handleClick} style={{cursor: 'pointer', marginLeft: '6vw', marginBottom: '20px', marginRight: '5px'}} >
            <ItemCustomer>
                <Grid className={styles.orderName}>{order.title}</Grid>
                <Divider/>
                <Grid>
                    Тип заказа: {order.type}
                </Grid>
                <Divider/>
                <Grid className={styles.orderDescription}>Описание заказа: {order.description}</Grid>
                <Divider/>
                <Grid>Цена: {order.price}</Grid>
                <Divider/>
                <Grid>Статус заказчика: {customerStatus?.status}</Grid>
                <Divider/>
                <Grid>Статус исполнителя: {order.price}</Grid>
            </ItemCustomer>
        </Grid>
    );
};

export default CustomerOrderItem;