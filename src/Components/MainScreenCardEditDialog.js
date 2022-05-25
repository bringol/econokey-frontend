import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function MainScreenCardEditDialog(props) {
    const {index, onClose, value: valueProp, open, ...other } = props;
     
    const [value, setValue] = useState(valueProp);
    const [userName, setUserName] = useState(value.usuario);
    const [password, setPassword] = useState(value.password);
    const [comentarios, setComentarios] = useState(value.comentario);
    const [url, setUrl] = useState(value.url);
    const [values, setValues] = useState({ showPassword: false, });

    useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleCancelar = () => {
        onClose();
    };

    const handleGuardar = () => {
        value.usuario=userName;
        value.password=password;
        value.comentario=comentarios;
        value.url=url;        
        onClose(value);
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
        setUserName(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleComentarios = (event) => {
        setComentarios(event.target.value);
    }

    const handleUrl = (event) => {
        setUrl(event.target.value);
    }

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '70%' } }}
            maxWidth="xs"
            scroll='paper'
            open={open}
            {...other}
        >
            <DialogTitle>{value.titulo}</DialogTitle>
            <DialogContent dividers>
                <TextField
                    required
                    id={"username"+index}
                    label="Usuario"
                    fullWidth
                    onChange={(event) => handleUserName(event)}
                    value={userName}                    
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    required
                    id={"password"+index}
                    label="Constraseña"
                    fullWidth
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={(event) => handlePassword(event)}
                    value={password}
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
                    required
                    id={"comentarios"+index}
                    label="Comentarios"
                    fullWidth
                    onChange={(event) => handleComentarios(event)}
                    value={comentarios}                    
                    multiline
                    maxRows={4}
                    sx={{
                        background: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    required
                    id={"url"+index}
                    label="URL"
                    fullWidth
                    onChange={(event) => handleUrl(event)}
                    value={url}                    
                    sx={{
                        background: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancelar}>
                    Cancelar
                </Button>
                <Button onClick={handleGuardar}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MainScreenCardEditDialog;