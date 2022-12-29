import React, {useEffect, useState} from 'react';
import {Button, Divider, Drawer, List} from "@mui/material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";

const NotificationsDrawer = (props) => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state?.app?.customerPublishedOrders)
    const executors = useSelector(state => state?.app?.executorsList)
    const customerNotifications = useSelector(state => state?.app?.customerNotifications)
    const executorNotifications = useSelector(state => state?.app?.executorNotifications)
    const users = useSelector(state => state?.app?.executorsList)


    const clickHandler = (executorId, orderId) => {
        props.navigate(`/executor/${executorId}/${orderId}`)
    }
    console.log(props.open)

    return (
        <div style={
                {
                    position: 'absolute',
                    top: '100%',
                    background: 'white',
                    boxShadow: '0 0 5px black',
                    borderRadius: '5px',
                    width: '300px',
                    maxHeight: '300px',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    display: props.open ? 'none' : 'block',
                }
            }
        >
            <div style={{color: 'black'}}>
                <div>Отклики</div>
                {customerNotifications.length > 0 ? <div>
                <hr></hr>
                    {customerNotifications.map((notification)=>{
                        const order = orders.find((order)=>order.id === notification.order_id)
                        const executor = users.find((user) => user.id === notification.executor)
                        return <div onClick={() => clickHandler(executor?.id, order?.id)}>
                                <div>Пользователь:{executor?.name}</div>
                                <div>Заказ: {order?.title}</div>
                                <hr></hr>
                            </div>
                    })}

                </div>
                    :
                    <div>Откликов пока нет</div>
                }
            </div>
            {/* <Drawer
                anchor={'right'}
                open={props.open}
                onClose={() => props.setOpen(false)}
            >
                <Box
                    role="presentation"
                    onClick={() => props.setOpen(false)}
                >
                    <List>
                    </List>
                    <Divider />
                </Box>
            </Drawer> */}
        </div>
    );
};

export default NotificationsDrawer;