import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import styles from './ProfilePage.module.css'
import {Avatar, Button, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import RateSlider from "../../RateSlider/RateSlider";
import plug from '../../../static/images/plug.jpg'
import {changeProfilePhoto, getExecutorDoneOrdersThunk} from "../../../redux/App/appSlice";
import ReviewList from "../../Review/ReviewList";
import {useNavigate} from "react-router-dom";
import CreateOrderModal from "../../modals/CreateOrderModal";

const ProfilePage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector(state => state.app.user.id)
    const avatar = useSelector(state => state?.app?.user?.photo_url)
    const name = useSelector(state => state.app.user.name)
    const email = useSelector(state => state.app.user.email)
    const rate = useSelector(state => state?.app?.user?.rate)
    const userType = useSelector(state => state?.app?.userType)
    const [open, setOpen] = useState(false)

    const changePhoto = (e) => {
        const photo = URL.createObjectURL(e.target.files[0])
        dispatch(changeProfilePhoto({photo: photo}))
    }

    const clickHandler = () => {
        navigate('/myOrders')
    }

    useEffect(() => {
        dispatch(getExecutorDoneOrdersThunk())
    }, [])



    return (
        <Grid className={styles.wrapper}>
            <Grid container spacing={3}>
                <Grid item xs={3.5} className={styles.profileButtons}>
                    <Grid>
                        {userType === 'executor' ?
                            <Button onClick={clickHandler} variant={'outlined'} color={'success'}>Просмотр выполенных заказов</Button>
                            :
                            <>
                                <Button onClick={() => setOpen(prevState => !prevState)} variant={'outlined'} color={'success'}>Сделать заказ</Button>
                                <CreateOrderModal open={open} onClose={() => setOpen(false)}>

                                </CreateOrderModal>
                            </>}
                    </Grid>
                </Grid>
            <Grid className={styles.profileCard}>
                {avatar ?
                <>
                    <Grid className={styles.avatar}>
                                <img className={styles.avatarImg} alt={'Your photo'} src={avatar}/>
                            </Grid>
                    <Grid>
                        <Button className={styles.uploadButton} variant="outlined" color={'success'} component="label">
                            Сменить фото
                            <input onChange={changePhoto} hidden accept="image/*" type="file" />
                        </Button>
                    </Grid>
                </>
                    :
                    <>
                        <Grid className={styles.emptyAvatar}>
                            <img className={styles.avatarImg} alt={'Your photo'} src={plug}/>
                        </Grid>
                        <Button className={styles.uploadButton} variant="outlined" color={'success'} component="label">
                            Загрузить фото
                                <input onChange={changePhoto} hidden accept="image/*" multiple type="file" />
                        </Button>
                    </>
                }
                <Grid className={styles.info}>
                    <Divider >Имя</Divider>
                    <Typography className={styles.text}>{name}</Typography>
                    <Divider >Email</Divider>
                    <Typography className={styles.text}>{email}</Typography>
                    <Divider >Телефон</Divider>
                    <Typography className={styles.text}>89218761108</Typography>

                    {rate && <><Divider>Рейтинг</Divider><RateSlider className={styles.rateSlider} defaultValue={rate} max={5} disabled size={'lg'} /></>}
                </Grid>
            </Grid>
                <Grid item xs={3.5} className={styles.profileReviews}>
                    <ReviewList/>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfilePage;