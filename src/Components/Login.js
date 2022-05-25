import React, { Component, useState} from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Navigate } from 'react-router-dom';
import Logo from "../css/econokey.png"
import theme from '../theme';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { Link } from '@mui/material';

const Login = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [usuarioValido, setUsuarioValido] = useState(false);

    const handleUserName = (event) => {
        setUserName(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            userName: data.get('userName'),
            password: data.get('password'),
        });
        setUsuarioValido(true);
    };

    const redirect = () => {
        if (usuarioValido) {
            /*localStorage.setItem("loggedin", true);
            setLogged(true);
            if (localStorage.getItem("email") === "nicolas.boyer@argontech.com.ar") {
                localStorage.setItem("isAdmin", true);
            }*/
            return <Navigate to='/' />
        }
    }

    return (
        <>
        {redirect()}
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{
                    m: 1,
                    width: 100,
                    height: 100,
                    bgcolor: '#FBFDF7'
                }}>
                    <img src={Logo} width='100' height='100' />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Ingresar
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Usuario"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        onChange={(event) => handleUserName(event)}
                        value={userName}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => handlePassword(event)}
                        value={password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="mainButton"
                        sx={{ mt: 3, mb: 2, color: 'black', fontWeight:'500' }}
                    >
                        ENTRAR
                    </Button>
                    <Grid container>
                        <Grid item xs sx={{ pr:1}}>
                        <Link
                                type="#"
                                fullwidth="true"
                                variant="contained"
                                size='small'
                                color='secondary'
                                sx={{ m:0, fontSize:14 }}
                            >
                                RECUPERAR BOVEDA
                            </Link>
                        </Grid>
                        <Grid item sx={{ pl:1}}>
                            <Link
                                type="#"
                                fullwidth="true"
                                variant="contained"
                                size='small'
                                color='secondary'
                                sx={{ m:0, fontSize:14 }}
                            >
                                CREAR NUEVA BOVEDA
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            </ThemeProvider>
        </>
    );
}

export default Login;