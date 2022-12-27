import React from 'react';
import {Item, ItemCustomer} from "../../Item/Item";
import Grid from "@mui/material/Grid";
import styles from "../../order/OrderItem.module.css";
import {Button, Divider} from "@mui/material";
import {useNavigate} from "react-router-dom";

const CustomerOrderItem = ({order}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/order/${order.id}`)
    }

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
            </ItemCustomer>
        </Grid>
    );
};

export default CustomerOrderItem;