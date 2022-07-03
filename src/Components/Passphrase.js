import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Box, InputBase, Typography, Alert, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FaDiceD20 } from 'react-icons/fa'
import Indicador from "./PasswordStrMeter"
import '../css/die.css'
import { generatePassphrase } from '../Controllers/WebService.controller';
import Slide from '@mui/material/Slide';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styled from 'styled-components';

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

const Passphrase = ({ navigate }) => {
  const [values, setValues] = useState({
    openCopyAlert: false,
    password: '',
    entropia: '',
    capitalizacion: '',
    delimitador: '',
    num: 15,
    showPassword: false,
    rolling: false,
    missingAmount: false,
    disableAplicar: true,
  });

  function entrop(longitud) {
    return (longitud * 12.925)
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

  const handleCapitalizacion = (event) => {
    setValues({
      ...values,
      capitalizacion: event.target.value,
      showPassword: false,
      disableAplicar: true,
    });
  }

  const handleDelimitador = (event) => {
    setValues({
      ...values,
      delimitador: event.target.value,
      showPassword: false,
      disableAplicar: true,
    });
  }

  const handleGenerarContraseña = () => {
    if (values.num === 0) {
      setValues({
        ...values,
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
    }

    async function generarPassphrase(delimitador, longitud, capitalizacion) {

      setValues({
        ...values,
        rolling: true,
      });

      let response = await generatePassphrase(delimitador, longitud, capitalizacion);

      if (response.code === 200) {
        setTimeout(() => {
          setValues({
            ...values,
            password: response.data.passphrase,
            entropia: `${entrop(values.num).toFixed(2)} bits de Entropia`,
            showPassword: true,
            rolling: false,
            disableAplicar: false,
          });
        }, 1000)
      }
      else {
        console.log(response.mensajeDetalle);
      }
    }

    generarPassphrase(values.delimitador, values.num, values.capitalizacion);
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
      <DialogTitle textAlign={'center'} sx={{
        background: 'linear-gradient(0deg, rgba(6, 109, 55, 0.05), rgba(6, 109, 55, 0.05)),#FBFDF7',
      }}>Generador de Passphrase</DialogTitle>
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
            Cantidad de palabras
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
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          m: 1
        }}>
          <TextField
            id={'delimitador'}
            label="Delimitador"
            onChange={(event) => handleDelimitador(event)}
            value={values.delimitador}
            sx={{
              borderRadius: '6px',
              mb: 1,
              mt: 1,
              mr: 1,
              width: 1 / 1.8,
            }}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
              }
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="selectCapitalizacionLabel">Capitalizacion</InputLabel>
            <Select
              labelId="selectCapitalizacionLabel"
              id="selectCapitalizacion"
              value={values.capitalizacion}
              label="Capitalizacion"
              onChange={handleCapitalizacion}
            >
              <MenuItem value={'MAYÚSCULA'}>MAYÚSCULA</MenuItem>
              <MenuItem value={'minúscula'}>minúscula</MenuItem>
              <MenuItem value={'Título'}>Título</MenuItem>
            </Select>
          </FormControl>
        </Box>
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

export default Passphrase;