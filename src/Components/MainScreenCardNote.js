import React from 'react';
import { rgbToHex, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'; 


// const useStyles = makeStyles(theme => ({
//     disabledInput: {
//       color: theme.palette.text.primary,
//     },
//   }));
  
  

const MainScreenCardNote = ({ account, index }) => {

    //const classes = useStyles();
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
                    m: 1,
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#2f4f4f",
                      },
                }}
            />
        </>
    );
}

export default MainScreenCardNote;