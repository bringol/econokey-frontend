import React, { Component, useState} from 'react';
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
import { red } from '@mui/material/colors';
import logoMain from '../img/logoMain.png';
import { NavLink, Navigate } from 'react-router-dom';

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

export default function SignUp({navigate}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [usuarioValido, setUsuarioValido] = useState(false);

    const handleUserName = (event) => {
        setUserName(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRepeatedPassword = (event) => {
        setRepeatedPassword(event.target.value);
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        userName: data.get('userName'),
      password: data.get('password'),
      repeatedPassword: data.get('repeatedPassword'),
    });
    setUsuarioValido(true);
  };

  const redirectLogin = () => {
    navigate("../login")
    }

  const redirect = () => {
    if (usuarioValido) {
        /*localStorage.setItem("loggedin", true);
        setLogged(true);
        if (localStorage.getItem("email") === "nicolas.boyer@argontech.com.ar") {
            localStorage.setItem("isAdmin", true);
        }*/
        return <Navigate to='/login' />
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, width: 200, height: 200}} src={logoMain} alt='logoMain' />

          <Typography component="h1" variant="h5">
            Registrar Boveda
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="Nombre de Boveda"
                  name="userName"
                  autoComplete="userName"
                  onChange={(event) => handleUserName(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => handlePassword(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repeatedPassword"
                  label="Repetir Contraseña"
                  type="password"
                  id="repeatedPassword"
                  autoComplete="new-repeated-password"
                  onChange={(event) => handleRepeatedPassword(event)}
                  
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="mainButton"
            >
              Crear
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" color='secondary' onClick={redirectLogin}>
                  Ya tenes una boveda? Ingresa.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}