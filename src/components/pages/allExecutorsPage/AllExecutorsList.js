import React from 'react';
import Grid from "@mui/material/Grid";
import OrderItem from "../../order/OrderItem";
import Box from "@mui/material/Box";
import AllExecutorsItem from "./AllExecutorsItem";

const AllExecutorsList = (props) => {


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
                {props?.executors && props?.executors.map((executor) =>
                    <AllExecutorsItem
                        executor={executor}
                        key={executor.id}
                    />
                )}
            </Grid>
        </Box>
    );
};

export default AllExecutorsList;