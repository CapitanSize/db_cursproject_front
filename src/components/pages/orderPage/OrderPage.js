import React, {useEffect} from 'react';
import OrderItem from "../../order/OrderItem";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styles from './OrderPage.module.css'
import {getOneOrder} from "../../../redux/App/appSlice";

function OrderPage(props) {

    const params = useParams()
    const dispatch = useDispatch()
    const order = useSelector(state => state.app.orders.find(order => order.id == params.id))

    return (
        <div className={styles.wrapper}>
            <OrderItem id={order.id} description={order.description} money={order.money} type={order.type} title={order.title} />
        </div>
    );
};

export default OrderPage;