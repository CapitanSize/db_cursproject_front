import React from 'react';
import {Item} from "../../Item/Item";
import Grid from "@mui/material/Grid";
import styles from "../../order/OrderItem.module.css";
import {Button, Divider} from "@mui/material";
import ChangeStatusModal from "../../modals/ChangeStatusModal";
import {useSelector} from "react-redux";
import {useState} from "react";

const InProgressOrdersItem = (props) => {

    const userType = useSelector(state => state?.app?.userType)
    const status = useSelector(state => state?.app?.customerCurrentOrderStatus?.status)
    const [open, setOpen] = useState(false)

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
                   <div><Divider/>
                        <Grid>Статус заказчика: {status?.customer_status}</Grid>
                        <Divider/>
                        <Grid>Статус исполнителя: {status?.executor_status ? status?.executor_status : 'Идёт поиск заказчика'}</Grid>
                        <Button variant={'outlined'} color={'success'} onClick={() => {setOpen(true)}}>Редактировать статус заказа</Button>
                        <ChangeStatusModal id={props?.order?.id} open={open} onClose={() => setOpen(false)} />
                    </div>
                </Grid>
            </Item>
        </Grid>
    );
};

export default InProgressOrdersItem;