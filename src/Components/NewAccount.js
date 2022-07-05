import React, { useContext, useEffect, useState } from 'react';
import NewAccountPasswordDialog from './NewAccountPasswordDialog';
import NewAccountPassphraseDialog from './NewAccountPassphraseDialog';
import { addElementoBoveda, deleteElementoBoveda, editElementoBoveda } from '../Controllers/WebService.controller';

import { IconButton, InputAdornment, TextField, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

import { FaDiceD20 } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import IconCustom from '../Icons/IconCustom';
import AppContext from '../AppContext';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConfirmationDialogRaw(props) {
    const { onClose, open, ...other } = props;

    const {setFilterButton} = useContext(AppContext);

    useEffect(()=>{
        setFilterButton(false);
    })

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

const NewAccount = ({ navigate }) => {
    const { state } = useLocation();

    let account = state ? state : '';

    const [values, setValues] = useState({
        element_id: account.element_id ? account.element_id : '',
        password_name: account.password_name ? account.password_name : '',
        description: account.description ? account.description : '',
        username: account.username ? account.username : '',
        password: account.password ? account.password : '',
        notes: account.notes ? account.notes : '',
        url: account.url ? account.url : '',
        icon: account.icon ? account.icon : '',
        showPassword: false,
        password_nameError: false,
        usernameError: false,
        passwordError: false,
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

    const handleClickClasica = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            openPassword: true
        })
    }

    const handleClickPassphrase = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            openPassphrase: true
        })
    }

    const handleUsername = (event) => {
        setValues({
            ...values,
            username: event.target.value,
            usernameError: event.target.value === '',
        });
    }

    const handlePassword = (event) => {
        setValues({
            ...values,
            password: event.target.value,
            passwordError: event.target.value === '',
        });
    }

    const handleNotes = (event) => {
        setValues({
            ...values,
            notes: event.target.value,
        });
    }

    const handleUrl = (event) => {
        setValues({
            ...values,
            url: event.target.value,
        });
    }

    const handlePasswordName = (event) => {
        setValues({
            ...values,
            password_name: event.target.value,
            password_nameError: event.target.value === '',
        });
    }

    const handleDescription = (event) => {
        setValues({
            ...values,
            description: event.target.value,
        });
    }

    const handleCancelar = () => {
        navigate("../")
    }

    const handleGuardar = () => {
        async function addPassword() {
            const newPassword = {
                element_type: "password",
                element: {
                    password_name: values.password_name,
                    username: values.username,
                    password: values.password,
                    url: values.url,
                    description: values.description,
                    icon: values.icon === '' || values.icon === 'default' ? 'default-account' : values.icon,
                }
            }

            let response = await addElementoBoveda(newPassword, localStorage.getItem("token"));

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        async function editPassword() {
            const newPassword = {
                element_id: values.element_id,
                element_type: "password",
                element: {
                    password_name: values.password_name,
                    username: values.username,
                    password: values.password,
                    url: values.url,
                    description: values.description,
                    icon: values.icon === '' || values.icon === 'default' ? 'default-account' : values.icon,
                }
            }

            let response = await editElementoBoveda(newPassword.element_id, newPassword, localStorage.getItem("token"));

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        setValues({
            ...values,
            password_nameError: values.password_name === '',
            usernameError: values.userame === '',
            passwordError: values.password === '',
        });

        if (values.password_name && values.username && values.password)
            if (!values.isEditing)
                addPassword();
            else
                editPassword();
    }

    const Borrar = () => {
        async function deletePassword(element_id) {

            let response = await deleteElementoBoveda(element_id, "password", localStorage.getItem("token"));

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }
        deletePassword(values.element_id)
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

    const handleChangeIcon = (newIcon) => {
        setValues({
            ...values,
            icon: newIcon,
        });
    }

    const handleClickCopyPassword = () => {
        navigator.clipboard.writeText(values.password)
        setValues({
            ...values,
            open: true,
        });
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setValues({
            ...values,
            open: false,
        });
    };

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
                <Typography variant="h1" component="div" noWrap sx={{
                    fontSize: 25,
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
                        'EDITAR CUENTA'
                    ) : 'NUEVA CUENTA'}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <TextField
                        error={values.password_nameError}
                        required
                        id={'0'}
                        label="Titulo"
                        onChange={(event) => handlePasswordName(event)}
                        value={values.password_name}
                        sx={{
                            backgroundColor: 'rgba(6, 109, 55, 0.05)',
                            borderRadius: '6px',
                            mb: 1,
                            mt: 1,
                        }}
                    />
                    <IconCustom value={values.icon} onChange={handleChangeIcon} />
                </Box>
                <TextField
                    id={'1'}
                    label="Descripcion"
                    fullWidth
                    onChange={(event) => handleDescription(event)}
                    multiline
                    minRows={2}
                    maxRows={2}
                    value={values.description}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    error={values.usernameError}
                    required
                    id={'2'}
                    label="Usuario"
                    fullWidth
                    onChange={(event) => handleUsername(event)}
                    value={values.username}
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
                    label="Constraseña"
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
                            <IconButton
                                aria-label="toggle dice visibility"
                                onClick={handleClickDice}
                                onMouseDown={handleMouseDownDice}
                            >
                                <FaDiceD20 />
                            </IconButton>
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            <IconButton
                                aria-label="copy password"
                                onClick={handleClickCopyPassword}
                                edge="end"
                            >
                                <ContentCopyIcon />
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
                            type="button"
                            variant="contained"
                            sx={{
                                color: "#EB5757",
                                backgroundColor: "#D3E8D3",
                                borderRadius: '16px',
                                m: 1
                            }}
                            onClick={handleClickPassphrase}
                        >
                            Passphrase
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{
                                color: "#EB5757",
                                backgroundColor: "#D3E8D3",
                                borderRadius: '16px',
                                m: 1
                            }}
                            onClick={handleClickClasica}
                        >
                            Clasica
                        </Button>
                    </Box>
                    : ''}
                <TextField
                    id={'4'}
                    label="Comentarios"
                    fullWidth
                    onChange={(event) => handleNotes(event)}
                    value={values.notes}
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
                <TextField
                    id={'5'}
                    label="URL"
                    fullWidth
                    onChange={(event) => handleUrl(event)}
                    value={values.url}
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
            <Snackbar open={values.open} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Contraseña copiada al portapapeles!
                </Alert>
            </Snackbar>
        </>
    );
}

export default NewAccount;