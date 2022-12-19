import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OrderItem from "./OrderItem";
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../redux/App/appSlice";

const OrderList = () => {
const orders = useSelector(state => state.app.orders)
const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders())
    }, [])


    return (
        <Box
            style={{
                marginTop: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexGrow: 1,
                marginBottom: '100px'
            }}
        >
            <Grid container spacing={2} style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                maxWidth: '850px'
            }}>
                {orders && orders.map((order) =>
                    <OrderItem
                        key={order.id}
                        id={order.id}
                        title={order.title}
                        description={order.description}
                        money={order.money}
                        type={order.type}
                    />
                )}
            </Grid>
        </Box>
    );
};

export default OrderList;