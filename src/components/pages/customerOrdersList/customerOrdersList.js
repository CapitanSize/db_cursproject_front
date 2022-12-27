import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {customerOrdersListThunk} from "../../../redux/App/appSlice";
import Grid from "@mui/material/Grid";
import OrderItem from "../../order/OrderItem";
import styles from './customerOrderlist.module.css'
import CustomerOrderItem from "./customerOrderItem";

const CustomerOrdersList = () => {

    const orders = useSelector(state => state?.app?.customerPublishedOrders)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(customerOrdersListThunk())
    }, [])

    return (
        <Grid item style={{marginTop: '10vh', overflowY: 'scroll', maxHeight: '80vh'}} >
            {orders && orders.map((order) => {
                return <CustomerOrderItem order={order}/>
            })}
        </Grid>
    );
};

export default CustomerOrdersList;