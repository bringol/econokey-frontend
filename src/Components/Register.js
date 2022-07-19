import React, { useContext, useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import logoMain from '../img/logoMain.png';
import { createVault } from '../Controllers/WebService.controller';
import AppContext from '../AppContext';
/*
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Econokey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
*/
const theme = createTheme({
  palette: {
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

export default function Register({ navigate }) {
  const [vaultName, setVaultName] = useState('');
  const [vaultKey, setVaultKey] = useState('');
  const [repeatedVaultKey, setRepeatedVaultKey] = useState('');

  const [errorVaultKey, setErrorVaultKey] = useState(false);
  const [errorVaultName, setErrorVaultName] = useState(false);
  const [vaultValido, setVaultValido] = useState(false);

  const handleVaultName = (event) => {
    setVaultName(event.target.value);
  }

  const handleVaultKey = (event) => {
    setVaultKey(event.target.value);
  }

  const handleRepeatedVaultKey = (event) => {
    setRepeatedVaultKey(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (vaultKey !== repeatedVaultKey && !vaultName) {
      setErrorVaultKey(true);
      setErrorVaultName(true);
      return;
    } else if (vaultKey !== repeatedVaultKey) {
      setErrorVaultKey(true);
      return;
    } else if (!vaultName) {
      setErrorVaultName(true);
      return;
    }

    async function registerVault(name, key) {
      let vault = { name: name, key: key };
      let response = await createVault(vault);
      if (response.code === 200) {
        setVaultValido(true);
      }
      else {
        console.log(response.mensajeDetalle);
      }
    }
    registerVault(vaultName, vaultKey);
  };

  const redirectLogin = () => {
    navigate("../login")
  }

  const redirect = () => {
    if (vaultValido) {
      /*localStorage.setItem("loggedin", true);
      setLogged(true);
      if (localStorage.getItem("email") === "nicolas.boyer@argontech.com.ar") {
          localStorage.setItem("isAdmin", true);
      }*/
      navigate("../login")
    }
  }

  const {topbar, setTopbar} = useContext(AppContext);

  useEffect(() => {
    setTopbar(false);

  }, [topbar, setTopbar]);

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
            <Avatar sx={{ m: 1, width: 200, height: 200 }} src={logoMain} alt='logoMain' />
            <Typography component="h1" variant="h5">
              Registrar Boveda
            </Typography>
            <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errorVaultName}
                    id="vaultName"
                    label="Nombre de Boveda"
                    name="vaultName"
                    autoComplete="vaultName"
                    onChange={(event) => handleVaultName(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errorVaultKey}
                    name="vaultKey"
                    label="Contraseña"
                    type="password"
                    id="vaultKey"
                    autoComplete="vaultKey"
                    onChange={(event) => handleVaultKey(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errorVaultKey}
                    name="repeatedVaultKey"
                    label="Repetir Contraseña"
                    type="password"
                    id="repeatedVaultKey"
                    autoComplete="repeatedVaultKey"
                    onChange={(event) => handleRepeatedVaultKey(event)}
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
          {/*<Copyright sx={{ mt: 5 }} />*/}
        </Container>
      </ThemeProvider>
    </>
  );
}