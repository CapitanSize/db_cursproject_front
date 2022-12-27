import React, {useState} from 'react';
import {styled} from "@mui/material/styles";
import {Button, Divider, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Item} from "../Item/Item";
import styles from './OrderItem.module.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {performExecutorThunk} from "../../redux/App/appSlice";
import PerformModal from "../modals/performModal";
import Typography from "@mui/material/Typography";

const OrderItem = ({id, description, price, type, title}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userType = useSelector(state => state.app.userType)
    const performedOrders = useSelector(state => state.app.executorPerformedOrders)
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        navigate(`/order/${id}`)
    }

    const performHandler = (e) => {
        setOpen(true)
        e.stopPropagation()
        dispatch(performExecutorThunk(id))
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
                        {performedOrders.find(order => order.id === id) ?
                            <Typography>Уже откликнулись</Typography>
                        :
                            <Button
                            style={{maxHeight: '50px'}}
                            variant={'outlined'}
                            color={'success'}
                            onClick={performHandler}
                            >
                            Выполнить
                            </Button>
                        }
                        <PerformModal open={open} onClose={() => setOpen(false)} title={title}/>
                    </Grid>
                </Grid>
                    </>}
            </Item>
        </Grid>
    );
};

export default OrderItem;