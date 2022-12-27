import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OrderItem from "./OrderItem";

const OrderList = (props) => {



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
                {props.orders && props?.orders.map((order) =>
                    <OrderItem
                        key={order.id}
                        id={order.id}
                        title={order.title}
                        description={order.description}
                        price={order.price}
                        type={order.type}
                    />
                )}
            </Grid>
        </Box>
    );
};

export default OrderList;