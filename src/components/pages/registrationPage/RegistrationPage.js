import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {login, registration, registrationThunk} from "../../../redux/App/appSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Item} from "../../Item/Item";
import {Alert, Button, Stack, Switch, TextField} from "@mui/material";
import styles from './RegistrationPage.module.css'
import Typography from "@mui/material/Typography";

const RegistrationPage = () => {

    const dispatch = useDispatch()
    const isRegistr = useSelector(state => state?.app?.registrationSuccess)
    const isRegistrError = useSelector(state => state?.app?.registrationError)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [number, setNumber] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState(null)
    const [checked, setChecked] = useState(false)

    const handleSwitch = (e) => {
        setChecked(e.target.checked)
    }


    const handlerClick = () => {
        if(email && name && secondName && number && password && country && city && birthDate){
            const user = {
                name: name,
                second_name: secondName,
                phone_number: number,
                birth_date: dateConverter(),
                country: country,
                city: city,
                email: email,
                password: password,
                photo_url: '123',
            }
            const userType = checked ? 'customer' : 'executor'
            dispatch(registrationThunk(user, userType))
        } else {
            setError('Что-то пошло не так! Убедитесь, что все поля заполнены.')
        }
    }

    const dateConverter = () => {
        const date = birthDate.split('-')
        return `${date[2]}.${date[1]}.${date[0]}`
    }

    useEffect(() => {
        isRegistr && navigate('/login')
    }, [isRegistr])


    return (
        <Box  >
            {error && <Alert onClose={() => {setError(null)}} className={styles.alert} severity={'error'}>{error}</Alert>}
            <Grid container style={{placeItems: 'center', display: 'grid'}}>
                <Item style={{marginTop: '10vh',
                    borderRadius: '10px', marginBottom: '5vh'}}>
                    <Grid style={{fontSize: '15px'}}>
                        <h1>Регистрация</h1>
                    </Grid>
                    <Grid>
                        <Stack className={styles.switcher} direction="row" spacing={1} alignItems="center">
                            <Typography className={styles.switcherText}>Исполнитель</Typography>
                            <Switch checked={checked} onChange={handleSwitch}/>
                            <Typography className={styles.switcherText}>Заказчик</Typography>
                        </Stack>
                    </Grid>
                    <Grid style={{marginTop: '20px'}}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            color={'success'}
                            label="Name"
                            variant="outlined"
                            type={'text'}
                        />
                    </Grid>
                    <Grid style={{marginTop: '20px'}}>
                        <TextField
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                            color={'success'}
                            label="Second name"
                            variant="outlined"
                            type={'text'}
                        />
                    </Grid>
                    <Grid style={{marginTop: '20px'}}>
                        <TextField
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            color={'success'}
                            label="Phone number"
                            variant="outlined"
                            type={'tel'}
                        />
                    </Grid>
                    <Grid style={{marginTop: '20px'}}>
                        <TextField
                            style={{width: '210px'}}
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            color={'success'}
                            /*label="Birth date"*/
                            variant="outlined"
                            type={'date'}
                        />
                    </Grid>
                    <Grid style={{marginTop: '20px'}} >
                        <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            color={'success'}
                            label="Email..."
                            variant="outlined"
                            type={'email'}
                        />
                    </Grid>
                    <Grid style={{marginTop: '20px'}}>
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            color={'success'}
                            label="Password"
                            variant="outlined"
                            type={'password'}
                        />
                    </Grid>
                    <Grid style={{marginTop: '20px'}}>
                        <TextField
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            color={'success'}
                            label="Password confirmation"
                            variant="outlined"
                            type={'password'}
                        />
                    </Grid>
                    <Grid style={{marginTop: '20px'}}>
                        <TextField
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            color={'success'}
                            label="Country"
                            variant="outlined"
                            type={'text'}
                        />
                    </Grid>
                    <Grid style={{marginTop: '20px'}}>
                        <TextField
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            color={'success'}
                            label="City"
                            variant="outlined"
                            type={'text'}
                        />
                    </Grid>
                    <Grid className={styles.footerText}>
                        <Typography>Уже есть аккаунт?</Typography>
                        <Link to={'/login'}>Войдите!</Link>
                    </Grid>
                    <Grid style={{marginBottom: '20px'}}>
                        <Button
                            onClick={handlerClick}
                            style={{marginTop: '20px'}}
                            variant={'outlined'}
                            color={'success'}
                        >
                            Зарегистрироваться
                        </Button>
                    </Grid>

                </Item>
            </Grid>
        </Box>
    );
};

export default RegistrationPage;