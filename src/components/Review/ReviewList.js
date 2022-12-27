import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from './Review.module.css'

const ReviewList = () => {

    const {id} = useParams()
    const currentUserId = useSelector(state => state?.app?.user?.id)


    return (
        <Box>
            {id === currentUserId ?
                <Grid className={styles.reviewTextWrapper}>
                    <Typography className={styles.reviewText}>У вас пока нет отзывов,</Typography>
                        <br/>
                    <Typography className={styles.reviewText}>начните выполнять заказы,</Typography>
                        <br/>
                    <Typography className={styles.reviewText}>чтобы отзывы появились</Typography>
                </Grid>
            :
                <Grid>
                    <Typography>У вас пока нет отзывов,</Typography>
                    <br/>
                    <Typography>начните выполнять заказы,</Typography>
                    <br/>
                    <Typography>чтобы отзывы появились</Typography>
                </Grid>
            }
        </Box>
    );
};

export default ReviewList;