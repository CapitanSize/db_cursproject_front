import React from 'react';
import {Item} from "../Item/Item";
import Grid from "@mui/material/Grid";
import styles from "./OrderItem.module.css";
import {Button, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";

const MyOrderItem = (props) => {


    return (
        <Grid onClick={() => props?.clickHandler(props?.order?.id)} style={{cursor: 'pointer'}} >
            <Item>
                <Grid className={styles.orderName}>{props?.order?.title}</Grid>
                <Divider/>
                <Grid>
                    Тип зказа: {props?.order?.type}
                </Grid>
                <Divider/>
                <Grid className={styles.orderDescription}>Описание заказа: {props?.order?.description}</Grid>
                <Grid className={styles.bottomWrapper}>
                    <Typography color={'success'}>Заказ выполнен!</Typography>
                </Grid>
            </Item>
        </Grid>
    );
};

export default MyOrderItem;