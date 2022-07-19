import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoMain from '../img/logoMain.png';
import { red } from '@mui/material/colors';
import { loginVault } from '../Controllers/WebService.controller';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AppContext from '../AppContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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

export default function Login({ navigate }) {
  const [vaultName, setVaultName] = useState('');
  const [vaultKey, setVaultKey] = useState('');
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [errorVaultKey, setErrorVaultKey] = useState(false);
  const [errorVaultName, setErrorVaultName] = useState(false);
  const [vaultValido, setVaultValido] = useState(false);

  const handleVaultName = (event) => {
    setVaultName(event.target.value);
    setErrorVaultName(event.target.value === '')
  }

  const handleVaultKey = (event) => {
    setVaultKey(event.target.value);
    setErrorVaultKey(event.target.value === '')
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    /*if (!vaultKey && !vaultName) {
      setErrorVaultKey(true);
      setErrorVaultName(true);
      return;
    } else if (!vaultKey) {
      setErrorVaultKey(true);
      return;
    } else if (!vaultName) {
      setErrorVaultName(true);
      return;
    }*/

    async function iniciarVault(name, key) {
      let vault = { name: name, key: key };
      let response = await loginVault(vault);
      if (response.code === 200) {
        setVaultValido(true);
        localStorage.setItem("token", response.data.access_token);
      }
      else {
        setError(response.data);
        setOpenError(true);
      }
    }
    iniciarVault(vaultName, vaultKey);
  };

  const redirectRegister = () => {
    navigate("../register")
  }


  const redirect = () => {
    if (vaultValido) {
      navigate("../")
    }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenError(false);
};

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
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, width: 200, height: 200 }} src={logoMain} alt='logoMain' />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                error={errorVaultName}
                id="vaultName"
                label="Nombre de Boveda"
                name="vaultName"
                autoComplete="vaultName"
                onChange={(event) => handleVaultName(event)}
                sx={{
                  mb: 1,
                }}
              />
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
          {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
        </Container>
        <Snackbar open={openError} autoHideDuration={1500} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>);
}