import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import './LoginPage.module.css'
import {alpha, styled} from "@mui/material/styles";
import {Alert, Button, Paper, Stack, Switch, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {login, loginThunk, removeLoginError} from "../../../redux/App/appSlice";
import {Item} from "../../Item/Item";
import styles from "./LoginPage.module.css";
import Typography from "@mui/material/Typography";



const LoginPage = () => {

    const dispatch = useDispatch()
    const loginSuccess = useSelector(state => state?.app?.loginSuccess)
    const loginError = useSelector(state => state?.app?.loginError)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState(null)

    const handleSwitch = (e) => {
        setChecked(e.target.checked)
    }

    const handlerClick = () => {
        if (email && password) {
            const user = {
                email: email,
                password: password
            }
            const userType = checked ? 'customer' : 'executor'
            dispatch(loginThunk(user, userType))
        } else {
            setError('Что-то пошло не так! Убедитесь, что все поля заполнены.')
        }
    }

    useEffect(() => {
        loginSuccess && navigate('/')
    }, [loginSuccess])

    return (
        <Box  >
            {error && <Alert onClose={() => {setError(null)}} className={styles.alert} severity={'error'}>{error}</Alert>}
            {loginError && <Alert onClose={() => {dispatch(removeLoginError())}} className={styles.alert} severity={'error'}>{loginError}</Alert>}
            <Grid container style={{placeItems: 'center', display: 'grid'}}>
              <Item style={{marginTop: '25vh',
                  borderRadius: '10px',}}>
                  <Grid style={{fontSize: '15px'}}>
                      <h1>Вход</h1>
                  </Grid>
                  <Grid>
                      <Stack className={styles.switcher} direction="row" spacing={1} alignItems="center">
                          <Typography className={styles.switcherText}>Исполнитель</Typography>
                          <Switch checked={checked} onChange={handleSwitch}/>
                          <Typography className={styles.switcherText}>Заказчик</Typography>
                      </Stack>
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
                          /*value={password}*/
                          onChange={(e) => setPassword(e.target.value)}
                          color={'success'}
                          label="Password"
                          variant="outlined"
                          type={'password'}
                      />
                  </Grid>
                  <Grid className={styles.footerText}>
                      <Typography>Впервые у нас?</Typography>
                      <Link to={'/registration'}>Зарегистрируйтесь!</Link>
                  </Grid>
                  <Grid>
                        <Button
                            onClick={handlerClick}
                            style={{marginTop: '20px'}}
                            variant={'outlined'}
                            color={'success'}
                        >
                            Войти
                        </Button>
                  </Grid>

              </Item>
            </Grid>
        </Box>
    );
};

export default LoginPage;