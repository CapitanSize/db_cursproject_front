import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import styles from './ProfilePage.module.css'
import {Avatar, Button, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import RateSlider from "../../RateSlider/RateSlider";
import plug from '../../../static/images/plug.jpg'
import {
    changeProfilePhoto,
    customerOrdersListThunk,
    fetchExecutorInProgressOrdersThunk,
    getExecutorDoneOrdersThunk
} from "../../../redux/App/appSlice";
import ReviewList from "../../Review/ReviewList";
import {useNavigate} from "react-router-dom";
import CreateOrderModal from "../../modals/CreateOrderModal";
import CustomerOrdersList from "../customerOrdersList/customerOrdersList";

const ProfilePage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector(state => state.app.user.id)
    const avatar = useSelector(state => state?.app?.user?.photo_url)
    const name = useSelector(state => state.app.user.name)
    const second_name = useSelector(state => state.app.user.second_name)
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

    const clickHandlerProcess = () => {
        navigate('/progressOrders')
    }


    useEffect(() => {
        dispatch(getExecutorDoneOrdersThunk())
        dispatch(customerOrdersListThunk())
        userType === 'executor' && dispatch(fetchExecutorInProgressOrdersThunk())
    }, [])



    return (
        <Grid className={styles.wrapper}>
            <Grid container spacing={3}>
                <Grid item xs={3.5} className={styles.profileButtons}>
                    <Grid>
                        {userType === 'executor' ?
                            <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Button style={{marginBottom: '20px'}} onClick={clickHandler} variant={'outlined'} color={'success'}>???????????????? ???????????????????? ??????????????</Button>
                                <Button onClick={clickHandlerProcess} variant={'outlined'} color={'success'}>???????????????? ?????????????? ??????????????</Button>
                            </Grid>
                            :
                            <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                <Button onClick={() => setOpen(prevState => !prevState)} variant={'outlined'} color={'success'}>?????????????? ??????????</Button>
                                <CreateOrderModal open={open} onClose={() => setOpen(false)}>
                                </CreateOrderModal>
                                <Button style={{marginTop: '10px'}} onClick={() => navigate('/allExecutors')} variant={'outlined'} color={'success'}>?????????????? ???????????? ????????????????????????</Button>
                            </Grid>}
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
                            ?????????????? ????????
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
                            ?????????????????? ????????
                                <input onChange={changePhoto} hidden accept="image/*" multiple type="file" />
                        </Button>
                    </>
                }
                <Grid className={styles.info}>
                    <Divider >??????</Divider>
                    <Typography className={styles.text}>{name} {second_name}</Typography>
                    <Divider >Email</Divider>
                    <Typography className={styles.text}>{email}</Typography>
                    <Divider >??????????????</Divider>
                    <Typography className={styles.text}>89218761108</Typography>

                    {rate && <><Divider>??????????????</Divider><RateSlider className={styles.rateSlider} defaultValue={rate} max={5} disabled size={'lg'} /></>}
                </Grid>
            </Grid>
                <Grid item xs={3.5} className={styles.profileReviews}>
                    {userType === 'executor' && <ReviewList/>}
                    {userType === 'customer' && <CustomerOrdersList/>}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfilePage;