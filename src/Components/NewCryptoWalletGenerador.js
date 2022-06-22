import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewAccountPasswordDialog from './NewAccountPasswordDialog';
import NewAccountPassphraseDialog from './NewAccountPassphraseDialog';
import { addElementoBoveda, deleteElementoBoveda, editElementoBoveda, generateCryptoWallet } from '../Controllers/WebService.controller';
import Share from '@mui/icons-material/Share';
import { Radio, IconButton, InputAdornment, TextField, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, FormControl, FormHelperText, InputBase } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

import { FaDiceD20 } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

function ConfirmationDialogDelete(props) {
    const { onClose, open, ...other } = props;

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle textAlign={'center'}>Confirmacion de eliminación</DialogTitle>
            <DialogContent dividers>
                <Typography sx={{ textAlign: 'center' }}>
                    ¿Esta seguro que desea eliminar este elemento? Esta accion no se puede deshacer y todo el contenido de su billetera se perdera.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button sx={{
                    m: 1,
                }}
                    variant='outlined'
                    size="small"
                    endIcon={<CancelIcon fontSize='small' />}
                    onClick={handleCancel}
                >
                    ATRAS
                </Button>
                <Button sx={{
                    m: 1,
                }}
                    variant='contained'
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon fontSize='small' />}
                    onClick={handleOk}
                >
                    ELIMINAR
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function ConfirmationDialogCancelar(props) {
    const { onClose, open, ...other } = props;

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle textAlign={'center'}>Confirmacion de cancelacion</DialogTitle>
            <DialogContent dividers>
                <Typography sx={{ textAlign: 'center' }}>
                    ¿Esta seguro que desea cancelar la operación? Todo su progreso se perderá.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button sx={{
                    m: 1,
                }}
                    variant='outlined'
                    size="small"
                    endIcon={<CancelIcon fontSize='small' />}
                    onClick={handleCancel}
                >
                    ATRAS
                </Button>
                <Button sx={{
                    m: 1,
                }}
                    variant='contained'
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon fontSize='small' />}
                    onClick={handleOk}
                >
                    SI
                </Button>
            </DialogActions>
        </Dialog >
    );
}

function ShareDialog(props) {
    const { direccion, onClose, open, ...other } = props;

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle textAlign={'center'}>Compartir billetera</DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <Box sx={{
                        m: 1
                    }}>
                        <QRCodeSVG value={direccion} />
                    </Box>
                    <InputBase
                            inputProps={{
                                style: { textAlign: "center", fontSize: 18 }
                            }}
                            fullWidth
                            id="contraseña"
                            disabled
                            multiline
                            maxRows={8}
                            value={direccion}
                        />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button sx={{
                    m: 1,
                }}
                    variant='outlined'
                    size="small"
                    startIcon={<CloseIcon fontSize='small' />}
                    onClick={handleOk}
                >
                    CERRAR
                </Button>
            </DialogActions>
        </Dialog >
    );
}

const NewCryptoWalletGenerador = ({ navigate }) => {
    const { state } = useLocation();

    let account = state ? state : '';

    const [values, setValues] = useState({
        id: account.id ? account.id : '',
        titulo: account.titulo ? account.titulo : '',
        descripcion: account.descripcion ? account.descripcion : '',
        moneda: account.moneda ? account.moneda : '',
        notas: account.notas ? account.notas : '',
        direccion: account.direccion ? account.direccion : '',
        llavePrivada: account.llavePrivada ? account.llavePrivada : '',
        passPhrase: account.passPhrase ? account.passPhrase : '',
        showLlavePrivada: false,
        showPassphrase: false,
        tituloError: false,
        descripcionError: false,
        monedaError: false,
        monedaHelper: '',
        notasError: false,
        showCrptoWallet: false,
        isEditing: state ? true : false,
        openDeleteConfirmation: false,
        openCancelConfirmation: false,
        openShareConfirmation: false,
        cancelable: true,
    });

    const handleClickShowLlavePrivada = () => {
        setValues({
            ...values,
            showLlavePrivada: !values.showLlavePrivada,
        });
    };

    const handleMouseDownLlavePrivada = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassphrase = () => {
        setValues({
            ...values,
            showPassphrase: !values.showPassphrase,
        });
    };

    const handleMouseDownPassphrase = (event) => {
        event.preventDefault();
    };

    const handleNotas = (event) => {
        setValues({
            ...values,
            notas: event.target.value,
            notasError: event.target.value === '',
            cancelable: false,
        });
    }

    const handleTitulo = (event) => {
        setValues({
            ...values,
            titulo: event.target.value,
            tituloError: event.target.value === '',
            cancelable: false,
        });
    }

    const handleDescripcion = (event) => {
        setValues({
            ...values,
            descripcion: event.target.value,
            descripcionError: event.target.value === '',
            cancelable: false,
        });
    }

    const handleMoneda = (event) => {
        setValues({
            ...values,
            moneda: event.target.value,
            monedaError: event.target.value === '',
            monedaHelper: event.target.value === '' ? 'Debe seleccionar una moneda' : '',
            cancelable: false,
        });
    }

    const handleCloseSharedDialog = () => {
        setValues({
            ...values,
            openShareConfirmation: false,
        });
    }

    const handleClickCompartir = () => {
        setValues({
            ...values,
            openShareConfirmation: true,
        });
    }

    const handleClickGenerar = () => {
        async function generarCryptoWallet() {
            setValues({
                ...values,
                rolling: true,
            });

            let response = await generateCryptoWallet(values.titulo, values.moneda);

            if (response.code === 200) {
                setTimeout(() => {
                    setValues({
                        ...values,
                        direccion: response.data.public_key,
                        llavePrivada: response.data.private_key,
                        passPhrase: response.data.passphrase,
                        showCrptoWallet: true,
                        rolling: false,
                        disableGuardar: false,
                        tituloError: values.titulo === '',
                        descripcionError: values.descripcion === '',
                        monedaError: values.moneda === '',
                        monedaHelper: values.moneda === '' ? 'Debe seleccionar una moneda' : '',
                    });
                }, 1000)
            }
            else {
                console.log(response.mensajeDetalle);
            }
        }

        setValues({
            ...values,
            tituloError: values.titulo === '',
            descripcionError: values.descripcion === '',
            monedaError: values.moneda === '',
            monedaHelper: values.moneda === '' ? 'Debe seleccionar una moneda' : '',
        });

        if (values.moneda && values.titulo)
            generarCryptoWallet();
    };

    const handleClickGuardar = () => {
        async function crearCuenta() {
            const cuentaNueva = {
                id: uuidv4(),
                titulo: values.titulo,
                descripcion: values.descripcion,
                type: 'wallet-gen',
                direccion: values.direccion,
                llavePrivada: values.llavePrivada,
                passPhrase: values.passPhrase,
                moneda: values.moneda,
                notas: values.notas,
            }

            let response = await addElementoBoveda(cuentaNueva);

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        async function editarCuenta() {
            const cuentaNueva = {
                id: values.id,
                titulo: values.titulo,
                descripcion: values.descripcion,
                type: 'wallet-gen',
                direccion: values.direccion,
                llavePrivada: values.llavePrivada,
                passPhrase: values.passPhrase,
                moneda: values.moneda,
                notas: values.notas,
            }

            let response = await editElementoBoveda(cuentaNueva.id, cuentaNueva);

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        setValues({
            ...values,
            tituloError: values.titulo === '',
            descripcionError: values.descripcion === '',
            monedaError: values.moneda === '',
            monedaHelper: values.moneda === '' ? 'Debe seleccionar una moneda' : '',
        });

        if (values.titulo && values.descripcion && values.moneda && values.direccion && values.llavePrivada)
            if (!values.isEditing)
                crearCuenta();
            else
                editarCuenta();
    }

    const handleCloseCancelConfirmation = (confirmDialog) => {
        if (confirmDialog)
            navigate('../');
        else
            setValues({
                ...values,
                openCancelConfirmation: false,
            });
    }

    const handleClickCancelar = () => {
        if (!values.cancelable)
            setValues({
                ...values,
                openCancelConfirmation: true,
            });
        else
            navigate('../');
    }

    const handleCloseDeleteConfirmation = (confirmDialog) => {
        const Borrar = () => {
            async function borrarCuenta(id) {

                let response = await deleteElementoBoveda(id);

                if (response.code === 200)
                    navigate("../")
                else
                    console.log(response.mensajeDetalle);
            }
            borrarCuenta(values.id)
        }

        if (confirmDialog)
            Borrar();
        else
            setValues({
                ...values,
                openDeleteConfirmation: false,
            });
    }

    const handleClickDelete = () => {
        setValues({
            ...values,
            openDeleteConfirmation: true,
        });
    }

    return (
        <>
            <Box
                component='form'
                Validate
                autoComplete='off'
                sx={{
                    flex: 1,
                    overflow: 'auto',
                    height: '100%',
                    display: 'block',
                    p: 1,
                }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <Typography variant="h1" component="div" noWrap sx={{
                        fontSize: 18,
                        fontWeight: '500',
                        fontStyle: 'normal',
                        flexGrow: 1,
                        alignSelf: 'center',
                        textAlign: 'center',
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                        p: 1,
                    }}>

                        {(values.isEditing) ? (
                            'EDITAR CryptoWallet'
                        ) : 'AGREGAR CryptoWallet'}
                    </Typography>
                    {(values.isEditing) ? (
                        <Button sx={{
                            m: 1,
                        }}
                            variant='outlined'
                            color="secondary"
                            size="small"
                            endIcon={<Share fontSize='small' />}
                            onClick={handleClickCompartir}
                        >
                            Compartir
                        </Button>) : null}
                </Box>
                <TextField
                    error={values.tituloError}
                    required
                    id={'0'}
                    label="Titulo"
                    fullWidth
                    onChange={(event) => handleTitulo(event)}
                    value={values.titulo}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    error={values.descripcionError}
                    required
                    id={'1'}
                    label="Descripcion"
                    fullWidth
                    onChange={(event) => handleDescripcion(event)}
                    multiline
                    maxRows={2}
                    value={values.descripcion}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    id={'4'}
                    label="Notas"
                    fullWidth
                    onChange={(event) => handleNotas(event)}
                    value={values.notas}
                    multiline
                    maxRows={4}
                    sx={{
                        background: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <FormControl component="fieldset" error={values.monedaError}>
                    <FormLabel id="moneda">Moneda</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="moneda"
                        name="moneda-group"
                        onChange={handleMoneda}
                        value={values.moneda}
                    >
                        <FormControlLabel value="BTC" disabled={values.isEditing} control={<Radio />} label="Bitcoin" />
                        <FormControlLabel value="ETH" disabled={values.isEditing} control={<Radio />} label="Ethereum" />
                        <FormControlLabel value="ADA" disabled control={<Radio />} label="Cardamo" />
                    </RadioGroup>
                    <FormHelperText>{values.monedaHelper}</FormHelperText>
                </FormControl>
                {!values.isEditing ? (<Box sx={{
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
                        onClick={handleClickGenerar}
                        sx={{ fontSize: 90, color: "#0F1833" }}
                    >
                        <FaDiceD20 className={`${values.rolling && 'Die-shaking'}`} />
                    </Button>
                </Box>) : null}
                {values.showCrptoWallet || values.isEditing ? (
                    <>
                        <TextField
                            id={'2'}
                            label="Direccion"
                            multiline
                            minRows={2}
                            maxRows={2}
                            fullWidth
                            disabled
                            value={values.direccion}
                            sx={{
                                backgroundColor: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                mb: 1,
                                mt: 1,
                            }}
                        />
                        <TextField
                            id={'3'}
                            label="Llave privada"
                            fullWidth
                            disabled
                            type={values.showLlavePrivada ? 'text' : 'password'}
                            value={values.llavePrivada}
                            sx={{
                                background: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                mb: 1,
                                mt: 1,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowLlavePrivada}
                                        onMouseDown={handleMouseDownLlavePrivada}
                                        edge="end"
                                    >
                                        {values.showLlavePrivada ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <TextField
                            id={'4'}
                            label="Passphrase"
                            fullWidth
                            disabled
                            type={values.showPassphrase ? 'text' : 'password'}
                            value={values.passPhrase}
                            sx={{
                                background: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                mb: 1,
                                mt: 1,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassphrase}
                                        onMouseDown={handleMouseDownPassphrase}
                                        edge="end"
                                    >
                                        {values.showPassphrase ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                    </>)
                    : null}
                <Box
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <Button sx={{
                        m: 1,
                    }}
                        variant='outlined'
                        size="small"
                        endIcon={<CancelIcon fontSize='small' />}
                        onClick={handleClickCancelar}
                    >
                        CANCELAR
                    </Button>
                    <Button sx={{
                        m: 1,
                    }}
                        variant='contained'
                        color="success"
                        size="small"
                        endIcon={<SendIcon fontSize='small' />}
                        onClick={handleClickGuardar}
                    >
                        GUARDAR
                    </Button>
                    {(values.isEditing) ? (
                        <>
                            <Button sx={{
                                m: 1,
                            }}
                                variant='outlined'
                                color="error"
                                size="small"
                                startIcon={<DeleteIcon fontSize='small' />}
                                onClick={handleClickDelete}
                            >
                                ELIMINAR
                            </Button>
                        </>
                    ) : null}
                </Box>
            </Box >
            <ConfirmationDialogDelete
                id="confirmDialog"
                keepMounted
                open={values.openDeleteConfirmation}
                onClose={handleCloseDeleteConfirmation}
            />
            <ConfirmationDialogCancelar
                id="confirmCancelDialog"
                keepMounted
                open={values.openCancelConfirmation}
                onClose={handleCloseCancelConfirmation}
            />
            <ShareDialog
                id="sharedDialog"
                keepMounted
                open={values.openShareConfirmation}
                onClose={handleCloseSharedDialog}
                direccion={values.direccion}
            />
        </>
    );
}

export default NewCryptoWalletGenerador;