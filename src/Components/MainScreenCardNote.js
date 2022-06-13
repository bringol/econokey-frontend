import React from 'react';
import { TextField } from '@mui/material';

const MainScreenCardNote = ({ account, index }) => {

    return (
        <>
            <TextField
                required
                id={"comentario" + index}
                label="Comentarios"
                fullWidth
                type='text'
                value={account.comentarios}
                disabled
                multiline
                minRows={4}
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

export default MainScreenCardNote;