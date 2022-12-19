import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import styles from './ProfilePage.module.css'
import {Avatar, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import RateSlider from "../../RateSlider/RateSlider";

const ProfilePage = () => {

    const dispatch = useDispatch()
    const id = useSelector(state => state.app.user.id)
    const avatar = useSelector(state => state.app.user.photoUrl)
    const name = useSelector(state => state.app.user.username)
    const email = useSelector(state => state.app.user.email)
    const rate = useSelector(state => state.app.user.rate)


    return (
        <Grid className={styles.wrapper}>
            <Grid className={styles.profileCard}>
                <Grid className={styles.avatar}>
                    <img className={styles.avatarImg} alt={'Your photo'} src={avatar}/>
                </Grid>
                <Grid className={styles.info}>
                    <Divider >Имя</Divider>
                    <Typography className={styles.text}>{name}</Typography>
                    <Divider >Email</Divider>
                    <Typography className={styles.text}>{email}</Typography>
                    <Divider >Телефон</Divider>
                    <Typography className={styles.text}>89218761108</Typography>
                    <Divider>Рейтинг</Divider>
                    <RateSlider className={styles.rateSlider} defaultValue={rate} max={5} disabled size={'lg'} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfilePage;