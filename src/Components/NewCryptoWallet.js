import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewAccountPasswordDialog from './NewAccountPasswordDialog';
import NewAccountPassphraseDialog from './NewAccountPassphraseDialog';
import { addElementoBoveda, deleteElementoBoveda, editElementoBoveda } from '../Controllers/WebService.controller';

import { IconButton, InputAdornment, TextField, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import ShareIcon from '@mui/icons-material/Share';

import { FaDiceD20 } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import Share from '@mui/icons-material/Share';

//Componente Agregar Cryptowallet

function ConfirmationDialogRaw(props) {
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
                ¿Esta seguro que desea eliminar este elemento?
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
                    CANCELAR
                </Button>
                <Button sx={{
                    m: 1,
                }}
                    variant='outlined'
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

const NewCryptoWallet = ({ navigate }) => {
    const { state } = useLocation();

    let account = state ? state : '';

    const [values, setValues] = useState({
        id: account.id ? account.id : '',
        titulo: account.titulo ? account.titulo : '',
        descripcion: account.descripcion ? account.descripcion : '',
        userName: account.userName ? account.userName : '',
        password: account.password ? account.password : '',
        comentarios: account.comentarios ? account.comentarios : '',
        showPassword: false,
        tituloError: false,
        descripcionError: false,
        usuarioError: false,
        passwordError: false,
        comentariosError: false,
        openPassphrase: false,
        openPassword: false,
        disable: true,
        isEditing: state ? true : false,
        openConfirmation: false,
    });

    const handleClose = (newValue) => {
        setValues({
            ...values,
            openPassphrase: false,
            openPassword: false,
            disable: true,
            password: newValue ? newValue : values.password
        });
    };

    const handleClickDice = () => {
        setValues({
            ...values,
            disable: !values.disable,
        });
    };

    const handleMouseDownDice = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleUserName = (event) => {
        setValues({
            ...values,
            userName: event.target.value,
            usuarioError: event.target.value === '',
        });
    }

    const handlePassword = (event) => {
        setValues({
            ...values,
            password: event.target.value,
            passwordError: event.target.value === '',
        });
    }

    const handleComentarios = (event) => {
        setValues({
            ...values,
            comentarios: event.target.value,
            comentariosError: event.target.value === '',
        });
    }

    const handleTitulo = (event) => {
        setValues({
            ...values,
            titulo: event.target.value,
            tituloError: event.target.value === '',
        });
    }

    const handleDescripcion = (event) => {
        setValues({
            ...values,
            descripcion: event.target.value,
            descripcionError: event.target.value === '',
        });
    }

    const handleCancelar = () => {
        navigate("../")
    }

    const handleGuardar = () => {
        async function crearCuenta() {
            const cuentaNueva = {
                id: uuidv4(),
                titulo: values.titulo,
                descripcion: values.descripcion,
                type: 'wallet',
                userName: values.userName,
                password: values.password,
                comentarios: values.comentarios,
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
                type: 'wallet',
                userName: values.userName,
                password: values.password,
                comentarios: values.comentarios,
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
            usuarioError: values.userName === '',
            passwordError: values.password === '',
            comentariosError: values.comentarios === '',
        });

        if (values.titulo && values.descripcion && values.userName && values.password && values.comentarios)
            if (!values.isEditing)
                crearCuenta();
            else
                editarCuenta();
    }

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

    const handleCloseConfirmation = (confirmDialog) => {
        if (confirmDialog)
            Borrar();
        else
            setValues({
                ...values,
                openConfirmation: false,
            });
    }

    const handleClickDelete = () => {
        setValues({
            ...values,
            openConfirmation: true,
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
                        onClick={handleGuardar}
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
                    minRows={2}
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
                    error={values.usuarioError}
                    required
                    id={'2'}
                    label="Llave Pública"
                    multiline
                    minRows={1}
                    maxRows={2}
                    fullWidth
                    onChange={(event) => handleUserName(event)}
                    value={values.userName}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    error={values.passwordError}
                    required
                    id={'3'}
                    label="Llave Privada"
                    fullWidth
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={(event) => handlePassword(event)}
                    value={values.password}
                    sx={{
                        background: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {/* <IconButton
                                aria-label="toggle dice visibility"
                                onClick={handleClickDice}
                                onMouseDown={handleMouseDownDice}
                            >
                                <FaDiceD20 />
                            </IconButton> */}
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>,
                    }}
                />
                {!values.disable ?
                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: 'row',
                            overflow: 'auto',
                            display: 'block',
                            textAlign: 'center',
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                color: "#EB5757",
                                backgroundColor: "#D3E8D3",
                                borderRadius: '16px',
                                m: 1
                            }}
                            onClick={() => setValues({ ...values, openPassphrase: true })}
                        >
                            Passphrase
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                color: "#EB5757",
                                backgroundColor: "#D3E8D3",
                                borderRadius: '16px',
                                m: 1
                            }}
                            onClick={() => setValues({ ...values, openPassword: true })}
                        >
                            Clasica
                        </Button>
                    </Box>
                    : ''}
                <TextField
                    error={values.comentariosError}
                    required
                    id={'4'}
                    label="Comentarios"
                    fullWidth
                    onChange={(event) => handleComentarios(event)}
                    value={values.comentarios}
                    multiline
                    minRows={2}
                    maxRows={4}
                    sx={{
                        background: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
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
                        onClick={handleCancelar}
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
                        onClick={handleGuardar}
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
            <NewAccountPasswordDialog
                keepMounted
                open={values.openPassword}
                onClose={handleClose}
            />
            <NewAccountPassphraseDialog
                keepMounted
                open={values.openPassphrase}
                onClose={handleClose}
            />
            <ConfirmationDialogRaw
                id="confirmDialog"
                keepMounted
                open={values.openConfirmation}
                onClose={handleCloseConfirmation}
            />
        </>
    );
}

export default NewCryptoWallet;