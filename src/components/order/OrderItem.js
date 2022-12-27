import React from 'react';
import {styled} from "@mui/material/styles";
import {Button, Divider, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Item} from "../Item/Item";
import styles from './OrderItem.module.css'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const OrderItem = ({id, description, price, type, title}) => {

    const navigate = useNavigate()
    const userType = useSelector(state => state.app.userType)

    const handleClick = () => {
        navigate(`/order/${id}`)
    }

    return (
        <Grid item onClick={handleClick} style={{cursor: 'pointer'}} >
            <Item>
                <Grid className={styles.orderName}>{title}</Grid>
                <Divider/>
            <Grid>
                    Тип заказа: {type}
            </Grid>
                {/*<Divider/>
            <Grid className={styles.orderDescription}>Описание заказа: {description}</Grid>*/}
                {userType === 'executor' &&
                    <>
                    <Divider/>
                <Grid className={styles.bottomWrapper}>
                    <Grid>Ориентировочная сумма: <h3>{price}</h3></Grid>
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
        </Grid>
    );
};

export default OrderItem;