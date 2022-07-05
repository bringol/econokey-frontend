import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Box, FormControlLabel, FormGroup, InputBase, Switch, Typography, Alert, Toolbar, IconButton, AppBar } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FaBook, FaDiceD20 } from 'react-icons/fa'
import Indicador from "./PasswordStrMeter"
import '../css/die.css'
import { generatePassword } from '../Controllers/WebService.controller';
import Slide from '@mui/material/Slide';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styled from 'styled-components';
import HelpDialog from './HelpDialog';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const AlertCopy = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: 'black',
  background: 'linear-gradient(0deg, rgba(6, 109, 55, 0.05), rgba(6, 109, 55, 0.05)),#FBFDF7',
  '&:hover': {
    background: 'linear-gradient(0deg, rgba(6, 109, 55, 0.05), rgba(6, 109, 55, 0.05)),#FBFDF7',
  },
}));

const ContraseñaCombinada = ({ navigate }) => {
  const [values, setValues] = useState({
    openCopyAlert: false,
    password: '',
    entropia: '',
    num: 15,
    flagMayuscula: true,
    flagMinuscula: true,
    flagNumero: false,
    flagSimbolo: false,
    showPassword: false,
    rolling: false,
    missingType: false,
    missingAmount: false,
    disableAplicar: true,
  });

  const [open, setOpen] = React.useState(false);

  const handleMayuscula = (event) => {
    setValues({
      ...values,
      flagMayuscula: event.target.checked,
      missingType: !event.target.checked &&
        !values.flagMinuscula &&
        !values.flagNumero &&
        !values.flagSimbolo,
      showPassword: false,
      disableAplicar: true,
    });
  }

  const handleMinuscula = (event) => {
    setValues({
      ...values,
      flagMinuscula: event.target.checked,
      missingType: !event.target.checked &&
        !values.flagMayuscula &&
        !values.flagNumero &&
        !values.flagSimbolo,
      showPassword: false,
      disableAplicar: true,
    });
  }

  const handleNumero = (event) => {
    setValues({
      ...values,
      flagNumero: event.target.checked,
      missingType: !event.target.checked &&
        !values.flagMinuscula &&
        !values.flagMayuscula &&
        !values.flagSimbolo,
      showPassword: false,
      disableAplicar: true,
    });
  }

  const handleSimbolo = (event) => {
    setValues({
      ...values,
      flagSimbolo: event.target.checked,
      missingType: !event.target.checked &&
        !values.flagMinuscula &&
        !values.flagNumero &&
        !values.flagMayuscula,
      showPassword: false,
      disableAplicar: true,
    });
  }

  function sumar() {
    setValues({
      ...values,
      num: values.num + 1,
      missingAmount: false,
      showPassword: false,
      disableAplicar: true,
    });
  }

  function restar() {
    setValues({
      ...values,
      num: values.num > 0 ? values.num - 1 : 0,
      missingAmount: values.num - 1 <= 0 ? true : false,
      showPassword: false,
      disableAplicar: true,
    });

  }

  const handleGenerarContraseña = () => {
    if (!values.flagMinuscula && !values.flagMayuscula && !values.flagSimbolo && !values.flagNumero && values.num === 0) {
      setValues({
        ...values,
        missingType: true,
        missingAmount: true,
        showPassword: false,
      });
      return
    } else if (values.num === 0) {
      setValues({
        ...values,
        missingAmount: true,
        showPassword: false,
      });
      return
    } else if (!values.flagMinuscula && !values.flagMayuscula && !values.flagSimbolo && !values.flagNumero) {
      setValues({
        ...values,
        missingType: true,
        showPassword: false,
      });
      return
    }

    async function generarPassword(lower, upper, digit, symbol, longitud) {
      setValues({
        ...values,
        rolling: true,
      });

      let response = await generatePassword(lower, upper, digit, symbol, longitud);
      if (response.code === 200) {

        var ps = 0, min = 26, may = 26, num = 10, sim = 25
        if (values.flagMinuscula)
          ps += min
        if (values.flagMayuscula)
          ps += may
        if (values.flagSimbolo)
          ps += sim
        if (values.flagNumero)
          ps += num

        function entrop(longitud, sumatoriaSimbolos) {
          return (Math.log2(Math.pow(sumatoriaSimbolos, longitud)))
        }

        setValues({
          ...values,
          rolling: true,
        });

        setTimeout(() => {
          setValues({
            ...values,
            password: response.data,
            entropia: `${entrop(values.num, ps).toFixed(2)} bits de Entropia`,
            showPassword: true,
            rolling: false,
            disableAplicar: false,
          });
        }, 1000)
      }
      else {
        console.log(response);
      }
    }
    generarPassword(values.flagMinuscula, values.flagMayuscula, values.flagNumero, values.flagSimbolo, values.num);
  };

  const handleCancelar = () => {
    navigate('./')
  };

  const handleCopiar = () => {
    navigator.clipboard.writeText(values.password)
    setValues({
      ...values,
      openCopyAlert: true,
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setValues({
      ...values,
      openCopyAlert: false,
    });
  };

  return (
    <Dialog
      //sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '90%' } }}
      fullScreen
      scroll='paper'
      open={true}
    >
      <AppBar sx={{
          position: 'sticky',
          background: 'linear-gradient(0deg, rgba(6, 109, 55, 0.05), rgba(6, 109, 55, 0.05)), #FBFDF7',
          boxShadow: '0px 0.5px 2px rgba(0, 0, 0, 0.25)',
          color: '#1A1C19'
        }}>
          <Toolbar>
              <Typography variant="h5" component="div" noWrap sx={{
              fontSize: 16,
              fontWeight: '500',
              fontStyle: 'normal',
              flexGrow: 1,
              alignSelf: 'center'
              }}>
              Generador de Contraseñas
              </Typography>
              <IconButton
                aria-label="glosario"
                onClick={() => setOpen(true)}
                sx={{ color: "#0F1833" }}
              >
                <FaBook />
              </IconButton>
              <HelpDialog
                id={"help-menu"}
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
              />
          </Toolbar>
        </AppBar>
      <DialogContent dividers>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        >
          <Typography variant="h6" gutterBottom component="div">
            Longitud
          </Typography>
          <Typography sx={{ fontSize: 50 }}>
            {values.num}
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          mb: 1
        }}>
          <Button
            onClick={restar}
            sx={{ fontSize: 30, color: "#0F1833" }}
          >
            <RemoveCircleIcon />
          </Button>
          <Button
            onClick={sumar}
            sx={{ fontSize: 30, color: "#0F1833" }}
          >
            <AddCircleIcon />
          </Button>
        </Box>
        <FormGroup
          sx={{
            mb: 1
          }}>
          <FormControlLabel sx={{ paddingY: 0 }}
            control={<Switch />}
            label="MAYÚSCULAS [A-Z]"
            checked={values.flagMayuscula}
            onChange={handleMayuscula}
          />
          <FormControlLabel sx={{ paddingY: 0 }}
            control={<Switch />}
            label="minúsculas [a-z]"
            checked={values.flagMinuscula}
            onChange={handleMinuscula}
          />
          <FormControlLabel sx={{ paddingY: 0 }}
            control={<Switch />}
            label="Números [0-9]"
            checked={values.flagNumero}
            onChange={handleNumero}
          />
          <FormControlLabel sx={{ paddingY: 0 }}
            control={<Switch />}
            label="Símbolos Especiales"
            checked={values.flagSimbolo}
            onChange={handleSimbolo}
          />
          {/* <FormControlLabel sx={{ paddingY: 0 }}
                        disabled
                        control={<Switch />}
                        label="ASCII Extendido"
                        checked={values.flagASCII}
                        onChange={handleASCII}
                    /> */}
        </FormGroup>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          m: 1
        }}>
          <Typography variant="h5" gutterBottom component="div">
            Generar
          </Typography>
          <Button
            onClick={handleGenerarContraseña} //muestra la contraseña, la entropía y desbloquea el boton utilizar
            sx={{ fontSize: 90, color: "#0F1833" }}
          >
            <FaDiceD20 className={`${values.rolling && 'Die-shaking'}`} />
          </Button>
        </Box>
        {(values.missingType) ? (
          <Alert
            sx={{ mb: 2 }}
            severity="error"
          >
            Debe seleccionar al menos un tipo
          </Alert>
        ) : null}
        {(values.missingAmount) ? (
          <Alert
            sx={{ mb: 2 }}
            severity="error"
          >
            Longitud debe ser mayor a 0
          </Alert>
        ) : null}
        {(values.showPassword) ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 1,
            textAlign: 'center',
          }}>
            <InputBase
              inputProps={{
                style: { textAlign: "center", fontSize: 24 }
              }}
              fullWidth
              id="contraseña"
              disabled
              multiline
              maxRows={8}
              value={values.password}
              sx={{
                background: 'rgba(6, 109, 55, 0.05)',
                borderRadius: '6px',
                m: 1,
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#2f4f4f",
                },
              }}
            />
            <Indicador password={values.password} />
            <InputBase
              inputProps={{
                style: { textAlign: "center" }
              }}
              id="contraseña"
              label="Contraseña"
              disabled
              multiline
              maxRows={8}
              value={values.entropia}
              sx={{
                background: 'rgba(6, 109, 55, 0.05)',
                borderRadius: '6px',
                m: 1,
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#2f4f4f",
                },
              }}
            />
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button autoFocus onClick={handleCancelar} variant="outlined">
          <Typography sx={{ p: 1 }}>CERRAR</Typography> <CancelIcon />
        </Button>
        <ColorButton onClick={handleCopiar} disabled={values.disableAplicar} variant="contained">
          <Typography sx={{ p: 1 }}>COPIAR</Typography> <ContentCopyIcon />
        </ColorButton>
      </DialogActions>
      <Snackbar disableWindowBlurListener={true} open={values.openCopyAlert} autoHideDuration={1500} onClose={handleCloseAlert} TransitionComponent={SlideTransition}>
        <AlertCopy onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Contraseña copiada al portapapeles!
        </AlertCopy>
      </Snackbar>
    </Dialog>
  );
}

export default ContraseñaCombinada;