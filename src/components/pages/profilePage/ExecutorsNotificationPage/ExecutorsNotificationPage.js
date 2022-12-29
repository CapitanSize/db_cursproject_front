import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import styles from "../ProfilePage.module.css";
import plug from "../../../../static/images/plugNotProfile.jpg";
import {Alert, Button, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import RateSlider from "../../../RateSlider/RateSlider";
import {useEffect} from "react";
import {
    approveExecutorThunk, deleteOrderThunk,
    getExecutorThunk,
    rejectExecutorThunk,
    setErrorNull
} from "../../../../redux/App/appSlice";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const ExecutorsNotificationPage = (props) => {

    const {id, orderId} = useParams()
    const dispatch = useDispatch()
    const executor = useSelector(state => state?.app?.currentExecutor)
    const error = useSelector(state => state?.app?.error)
    const naviagte = useNavigate()

    useEffect(() => {
        dispatch(getExecutorThunk(id))
    }, [])

    const clickHandlerSuccess = () => {
        dispatch(approveExecutorThunk(orderId, id))
        naviagte('/')
    }

    const clickHandlerError = () => {
        dispatch(rejectExecutorThunk(orderId, id))
        naviagte('/')
    }


    return (
        <div>
            {error && <Alert onClose={() => {dispatch(setErrorNull())}} severity={'error'}>{error}</Alert>}
            <Grid className={styles.wrapper}>
                <Grid className={styles.profileCard}>
                    {executor.photo_url ?
                        <>
                            <Grid className={styles.avatar}>
                                <img className={styles.avatarImg} alt={'Your photo'} src={executor.photo_url}/>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid className={styles.emptyAvatar}>
                                <img className={styles.avatarImg} alt={'Your photo'} src={plug}/>
                            </Grid>
                        </>
                    }
                    <Grid className={styles.info}>
                        <Divider >Имя</Divider>
                        <Typography className={styles.text}>{executor.name} {executor.second_name}</Typography>
                        <Divider >Страна</Divider>
                        <Typography className={styles.text}>{executor.country}</Typography>
                        <Divider >Телефон</Divider>
                        <Typography className={styles.text}>{executor.phone_number}</Typography>

                        {executor.rate ? <><Divider>Рейтинг</Divider><RateSlider className={styles.rateSlider} defaultValue={executor.rate} max={5} disabled size={'lg'} /></> :
                            <Grid>
                                <Divider/>
                                <Typography style={{fontSize: '20px'}}>Рейтинг: Слишком мало оценок</Typography>
                            </Grid>
                        }
                        <Grid style={{marginTop: '20px', display: 'flex', flexDirection: 'column'}}>
                        <Button style={{marginBottom: '10px'}} variant={'outlined'} color={'success'} onClick={clickHandlerSuccess} >Выбрать пользователя</Button>
                        <Button variant={'outlined'} color={'error'} onClick={clickHandlerError} >Убрать пользователя</Button>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ExecutorsNotificationPage;