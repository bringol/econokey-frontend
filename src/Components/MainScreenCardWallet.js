import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const MainScreenCardWallet = ({ account, index }) => {

    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <TextField
                //required
                label="Llave Pública"
                id={"username" + index}
                fullWidth
                value={account.userName || account.direccion }
                disabled
                multiline
                minRows={1}
                maxRows={2}
                sx={{
                    backgroundColor: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    m: 1
                }}
            />
            
            <TextField
                //required
                id={"password" + index}
                label="Llave Privada"
                fullWidth
                type={values.showPassword ? 'text' : 'password'}
                value={account.password || account.llavePrivada}
                disabled
                sx={{
                    background: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    m: 1
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
                value={account.comentarios || account.notas}
                disabled
                multiline
                maxRows={4}
                sx={{
                    background: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    m: 1
                }}
            />
        </>
    );
}

export default MainScreenCardWallet;