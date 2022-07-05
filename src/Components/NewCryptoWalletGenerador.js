import React, { useContext, useEffect, useState } from 'react';
import { addElementoBoveda, deleteElementoBoveda, editElementoBoveda, generateCryptoWallet } from '../Controllers/WebService.controller';
import Share from '@mui/icons-material/Share';
import { Radio, IconButton, InputAdornment, TextField, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormLabel, RadioGroup, FormControlLabel, FormControl, FormHelperText, InputBase } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

import { FaDiceD20 } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import AppContext from '../AppContext';

function ConfirmationDialogDelete(props) {
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
        element_id: account.element_id ? account.element_id : '',
        wallet_name: account.wallet_name ? account.wallet_name : '',
        description: account.description ? account.description : '',
        cryptocurrency: account.cryptocurrency ? account.cryptocurrency : '',
        notes: account.notes ? account.notes : '',
        public_key: account.public_key ? account.public_key : '',
        private_key: account.private_key ? account.private_key : '',
        passphrase: account.passphrase ? account.passphrase : '',
        showPrivatKey: false,
        showPassphrase: false,
        wallet_nameError: false,
        cryptocurrencyError: false,
        cryptocurrencyHelper: '',
        showCrptoWallet: false,
        isEditing: state ? true : false,
        openDeleteConfirmation: false,
        openCancelConfirmation: false,
        openShareConfirmation: false,
        cancelable: true,
    });

    const handleClickShowPrivateKey = () => {
        setValues({
            ...values,
            showPrivatKey: !values.showPrivatKey,
        });
    };

    const handleMouseDownPrivateKey = (event) => {
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

    const handleNotes = (event) => {
        setValues({
            ...values,
            notes: event.target.value,
            cancelable: false,
        });
    }

    const handleWalletName = (event) => {
        setValues({
            ...values,
            wallet_name: event.target.value,
            wallet_nameError: event.target.value === '',
            cancelable: false,
        });
    }

    const handleDescription = (event) => {
        setValues({
            ...values,
            description: event.target.value,
            cancelable: false,
        });
    }

    const handleCryptocurrency = (event) => {
        setValues({
            ...values,
            cryptocurrency: event.target.value,
            cryptocurrencyError: event.target.value === '',
            cryptocurrencyHelper: event.target.value === '' ? 'Debe seleccionar una moneda' : '',
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

            let response = await generateCryptoWallet(values.wallet_name, values.cryptocurrency);

            if (response.code === 200) {
                setTimeout(() => {
                    setValues({
                        ...values,
                        public_key: response.data.public_key,
                        private_key: response.data.private_key,
                        passphrase: response.data.passphrase,
                        showCrptoWallet: true,
                        rolling: false,
                        disableGuardar: false,
                        wallet_nameError: values.wallet_name === '',
                        cryptocurrencyError: values.cryptocurrency === '',
                        cryptocurrencyHelper: values.cryptocurrency === '' ? 'Debe seleccionar una moneda' : '',
                    });
                }, 1000)
            }
            else {
                console.log(response.mensajeDetalle);
            }
        }

        setValues({
            ...values,
            wallet_nameError: values.wallet_name === '',
            cryptocurrencyError: values.cryptocurrency === '',
            cryptocurrencyHelper: values.cryptocurrency === '' ? 'Debe seleccionar una moneda' : '',
        });

        if (values.cryptocurrency && values.wallet_name)
            generarCryptoWallet();
    };

    const handleClickGuardar = () => {
        async function addWallet() {
            const newWallet = {
                element_type: "wallet",
                element: {
                    wallet_name: values.wallet_name,
                    cryptocurrency: values.cryptocurrency,
                    public_key: values.public_key,
                    private_key: values.private_key,
                    passphrase: values.passphrase,
                    //notes: values.notes,
                    description: values.description,
                    icon: "econokey",
                }
            }

            let response = await addElementoBoveda(newWallet, localStorage.getItem("token"));

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        async function editWallet() {
            const newWallet = {
                element_id: values.element_id,
                element_type: "wallet",
                element: {
                    wallet_name: values.wallet_name,
                    cryptocurrency: values.cryptocurrency,
                    public_key: values.public_key,
                    private_key: values.private_key,
                    passphrase: values.passphrase,
                    //notes: values.notes,
                    description: values.description,
                    icon: "econokey",
                }
            }

            let response = await editElementoBoveda(newWallet.element_id, newWallet, localStorage.getItem("token"));

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        setValues({
            ...values,
            wallet_nameError: values.wallet_name === '',
            cryptocurrencyError: values.cryptocurrency === '',
            cryptocurrencyHelper: values.cryptocurrency === '' ? 'Debe seleccionar una moneda' : '',
        });

        if (values.wallet_name && values.cryptocurrency && values.public_key && values.private_key)
            if (!values.isEditing)
                addWallet();
            else
                editWallet();
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
            async function borrarCuenta(element_id) {

                let response = await deleteElementoBoveda(element_id, "wallet", localStorage.getItem("token"));

                if (response.code === 200)
                    navigate("../")
                else
                    console.log(response.mensajeDetalle);
            }
            borrarCuenta(values.element_id)
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
                    error={values.wallet_nameError}
                    required
                    id={'0'}
                    label="Titulo"
                    fullWidth
                    onChange={(event) => handleWalletName(event)}
                    value={values.wallet_name}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    id={'1'}
                    label="Descripcion"
                    fullWidth
                    onChange={(event) => handleDescription(event)}
                    multiline
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
                    id={'4'}
                    label="Notas"
                    fullWidth
                    onChange={(event) => handleNotes(event)}
                    value={values.notes}
                    multiline
                    maxRows={4}
                    sx={{
                        background: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <FormControl component="fieldset" error={values.cryptocurrencyError}>
                    <FormLabel id="moneda">Moneda</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="moneda"
                        name="moneda-group"
                        onChange={handleCryptocurrency}
                        value={values.cryptocurrency}
                    >
                        <FormControlLabel value="BTC" disabled={values.isEditing} control={<Radio />} label="Bitcoin" />
                        <FormControlLabel value="ETH" disabled={values.isEditing} control={<Radio />} label="Ethereum" />
                        <FormControlLabel value="ADA" disabled control={<Radio />} label="Cardamo" />
                    </RadioGroup>
                    <FormHelperText>{values.cryptocurrencyHelper}</FormHelperText>
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
                            label="Llave publica"
                            multiline
                            minRows={2}
                            maxRows={2}
                            fullWidth
                            disabled
                            value={values.public_key}
                            sx={{
                                backgroundColor: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                mb: 1,
                                mt: 1,
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#2f4f4f",
                                  },
                            }}
                        />
                        <TextField
                            id={'3'}
                            label="Llave privada"
                            fullWidth
                            disabled
                            type={values.showPrivatKey ? 'text' : 'password'}
                            value={values.private_key}
                            sx={{
                                background: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                mb: 1,
                                mt: 1,
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#2f4f4f",
                                  },
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPrivateKey}
                                        onMouseDown={handleMouseDownPrivateKey}
                                        edge="end"
                                    >
                                        {values.showPrivatKey ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <TextField
                            id={'5'}
                            label="Passphrase"
                            fullWidth
                            disabled
                            type={values.showPassphrase ? 'text' : 'password'}
                            value={values.passphrase}
                            sx={{
                                background: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                mb: 1,
                                mt: 1,
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#2f4f4f",
                                  },
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
                direccion={values.public_key}
            />
        </>
    );
}

export default NewCryptoWalletGenerador;