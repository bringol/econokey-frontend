import React, {useState} from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const MainScreenCardAccount = ({ account, index }) => {

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
                required
                label="Usuario"
                id={"username" + index}
                fullWidth
                value={account.userName}
                disabled
                sx={{
                    background: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    m: 1,
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#2f4f4f",
                      },
                }}
            />
            <TextField
                required
                id={"password" + index}
                label="Constraseña"
                fullWidth
                type={values.showPassword ? 'text' : 'password'}
                value={account.password}
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
                required
                id={"comentarios" + index}
                label="Comentarios"
                fullWidth
                value={account.comentarios}
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
            <TextField
                required
                id={"url" + index}
                label="URL"
                fullWidth
                value={account.url}
                disabled
                sx={{
                    background: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    m: 1,
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#2f4f4f",
                      },
                }}
            />
        </>
    );
}

export default MainScreenCardAccount;