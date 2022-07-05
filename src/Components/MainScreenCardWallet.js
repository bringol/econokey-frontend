import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, InputBase, TextField } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

import { QRCodeSVG } from 'qrcode.react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const MainScreenCardWallet = ({ account, index }) => {

    const [values, setValues] = useState({
        showPassword: false,
        open: false,
        openShareConfirmation: false,
    });

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

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setValues({
            ...values,
            open: false,
        });
    };

    const handleClickCopyPublicKey = () => {
        navigator.clipboard.writeText(account.public_key)
        setValues({
            ...values,
            open: true,
        });
    }

    return (
        <>
            <TextField
                label="Llave Pública"
                id={"username" + index}
                fullWidth
                value={account.public_key}
                disabled
                multiline
                minRows={1}
                maxRows={2}
                sx={{
                    background: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    m: 1,
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#2f4f4f",
                    },
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="copy public key"
                            onClick={handleClickCopyPublicKey}
                            edge="end"
                        >
                            <ContentCopyIcon />
                        </IconButton>
                        <IconButton
                            aria-label="shared qr code"
                            onClick={handleClickCompartir}
                            edge="end"
                        >
                            <QrCode2Icon />
                        </IconButton>
                    </InputAdornment>,
                }}
            />

            <TextField
                id={"password" + index}
                label="Llave Privada"
                fullWidth
                type={values.showPassword ? 'text' : 'password'}
                value={account.private_key}
                disabled
                sx={{
                    background: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    m: 1,
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#2f4f4f",
                    },
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
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
            <TextField
                id={"comentarios" + index}
                label="Comentarios"
                fullWidth
                value={account.notes}
                disabled
                multiline
                maxRows={4}
                sx={{
                    background: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    m: 1,
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#2f4f4f",
                    },
                }}
            />
            <Snackbar open={values.open} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Contraseña copiada al portapapeles!
                </Alert>
            </Snackbar>
            <ShareDialog
                id="sharedDialog"
                keepMounted
                open={values.openShareConfirmation}
                onClose={handleCloseSharedDialog}
                direccion={account.public_key}
            />
        </>
    );
}

export default MainScreenCardWallet;