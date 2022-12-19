import React from 'react';
import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Item} from "../Item/Item";

const OrderItem = ({id, description, money, type, title}) => {



    return (
        <Grid item>
            <Item>
                <Grid>{id}. {title}</Grid>
            <Grid>Тип зказа: {type}</Grid>
            <Grid>Описание заказа: {description}</Grid>
            <Grid>Сумма денег: {money}</Grid>
            </Item>
        </Grid>
    );
};

export default OrderItem;