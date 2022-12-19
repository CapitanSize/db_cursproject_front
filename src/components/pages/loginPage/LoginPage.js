import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import './loginForm.css'
import {alpha, styled} from "@mui/material/styles";
import {Button, Paper, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../../redux/App/appSlice";

const LoginPage = () => {

    const dispatch = useDispatch()
    const authUser = useSelector(state => state.app.user)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '70vw',
        maxWidth: '800px',
        boxShadow: theme.shadows[3],
        marginTop: '25vh',
        borderRadius: '10px'


    }));

    const handlerClick = () => {
        /*const user = {
            id: Date.now(),
            email: email,
            password: password
        }*/
        dispatch(login())
        navigate('/')
        console.log(authUser)
    }

    return (
        <Box  >
            <Grid container style={{placeItems: 'center', display: 'grid'}}>
              <Item>
                  <Grid>
                      <h1>Вход</h1>
                  </Grid>
                  <Grid style={{marginTop: '20px'}} >
                      <TextField
                          value={email}
                          onChange={(e) => {
                              setEmail(e.target.value)
                              console.log(email)
                          }}
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