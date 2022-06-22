import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { styled, Box, FormControlLabel, FormGroup, Grid, InputBase, Switch, Typography, Alert, IconButton, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FaDiceD20 } from 'react-icons/fa'
import Indicador from "./PasswordStrMeter"
import PassphraseModal from "./PassphraseModal"
import '../css/die.css'
import { generator } from '../Controllers/WebService.controller';
import { CollectionsBookmarkOutlined } from '@mui/icons-material';

function NewAccountPassphraseDialog(props) {
    const { onClose, open, ...other } = props;

    const [values, setValues] = useState({
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
        });
    }

    function restar() {
        setValues({
            ...values,
            num: values.num > 0 ? values.num - 1 : 0,
            missingAmount: values.num - 1 <= 0 ? true : false,
            showPassword: values.num - 1 <= 0 ? false : true,
            disableAplicar: values.num - 1 <= 0 ? true : false,
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

            let response = await generator(delimitador, longitud, capitalizacion);

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
        onClose();
    };

    const handleGuardar = () => {
        onClose(values.password);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '90%' } }}
            maxWidth="xs"
            scroll='paper'
            open={open}
            {...other}
        >
            <DialogTitle>Generar Passphrase</DialogTitle>
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
                            width: 1/1.8,
                        }}
                        inputProps={{
                            maxLength: 1,
                            style:{
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
                        />
                    </Box>
                ) : null}               
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancelar}>
                    Cancelar
                </Button>
                <Button onClick={handleGuardar} disabled={values.disableAplicar}>Aplicar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewAccountPassphraseDialog;