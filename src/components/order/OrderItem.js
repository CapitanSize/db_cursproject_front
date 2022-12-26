import React from 'react';
import {styled} from "@mui/material/styles";
import {Button, Divider, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Item} from "../Item/Item";
import styles from './OrderItem.module.css'
import {useNavigate} from "react-router-dom";

const OrderItem = ({id, description, money, type, title}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/order/${id}`)
    }

    return (
        <Grid item onClick={handleClick} style={{cursor: 'pointer'}} >
            <Item>
                <Grid className={styles.orderName}>{title}</Grid>
                <Divider/>
            <Grid>
                    Тип зказа: {type}
            </Grid>
                <Divider/>
            <Grid className={styles.orderDescription}>Описание заказа: {description}</Grid>
                <Divider/>
                <Grid className={styles.bottomWrapper}>
                    <Grid>Ориентировочная сумма: <h3>{money}</h3></Grid>
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
            </Item>
        </Grid>
    );
};

export default OrderItem;