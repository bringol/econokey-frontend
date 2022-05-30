import React, { Component, useState} from 'react';
//import  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoMain from '../img/logoMain.png';
import { NavLink, Navigate } from 'react-router-dom';
import { red } from '@mui/material/colors';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Econokey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({palette: {
    primary: {
      main: '#456cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    mainButton: {
      main: '#9CF6B1',
      contrastText: '#000000',
    },
  },
});

export default function SignIn({navigate}) {

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

    const redirectRegister = () => {
        navigate("../register")
    }
    

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, width: 200, height: 200}} src={logoMain} alt='logoMain' />
          
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Nombre de Boveda"
              name="userName"
              autoComplete="userName"
              onChange={(event) => handleUserName(event)}
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar nombre"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="mainButton"
            >
              Ingresar
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2" color='secondary' underline="none">
                  Recuperar Contraseña
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="#" variant="body2" color='secondary' underline="none" onClick={redirectRegister}>
                  {"Crear nueva boveda"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </> );
}