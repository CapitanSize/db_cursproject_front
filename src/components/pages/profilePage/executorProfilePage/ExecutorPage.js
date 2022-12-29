import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {approveExecutorThunk, getExecutorThunk, rejectExecutorThunk} from "../../../../redux/App/appSlice";
import styles from "../ProfilePage.module.css";
import Grid from "@mui/material/Grid";
import {Button, Divider} from "@mui/material";
import plug from "../../../../static/images/plugNotProfile.jpg";
import Typography from "@mui/material/Typography";
import RateSlider from "../../../RateSlider/RateSlider";

const ExecutorPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const executor = useSelector(state => state?.app?.currentExecutor)

    useEffect(() => {
        dispatch(getExecutorThunk(id))
    }, [])



    return (
        <div>
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
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
};

export default ExecutorPage;