import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { IconButton, InputAdornment, TextField, Grid,Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
//
import {FaDiceD20} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import PassphraseModal from "../Components/PassphraseModal"
import PasswordModal from "../Components/ContraseñaCombinadaModal"

function MainScreenCardEditDialog(props) {
    const {index, onClose, value: valueProp, open, ...other } = props;     
    const [value, setValue] = useState(valueProp);
    const [userName, setUserName] = useState(value.usuario);
    const [password, setPassword] = useState(value.password);
    const [comentarios, setComentarios] = useState(value.comentario);
    const [url, setUrl] = useState(value.url);
    const [values, setValues] = useState({ showPassword: false, });
    const [disable, setDisable] = React.useState(true);//para ocultar y mostrar los distintos passgen
    const [DisablePassphrase, setDisablePassphrase] = React.useState(true);
    const [DisablePassword, setDisablePassword] = React.useState(true);

    const[testPass, setTestPass]=useState("vacio")
    



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
                            {/* dado que muestra los generadores cuando recibe el click */}
                            <IconButton onClick={() =>setDisable(!disable) & setDisablePassphrase(true) & setDisablePassword(true)}>  
                                <FaDiceD20/>
                            </IconButton>                           
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
                {/* si disable cambia de estado muestra los generadores */}
                {!disable && (

                    // <PassphraseModal/>
                <Grid container>

              <Grid item xs={6}>
                  <Box
                    mt={1}                    
                    >                    
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{color:"#EB5757", backgroundColor: "#D3E8D3" ,borderRadius: '16px', paddingX:1}}
                          onClick={() => setDisablePassphrase(false) & setDisablePassword(true)}
                          >
                          Passphrase
                        </Button>
                      
                  </Box>
              </Grid>
              
                  <Grid item xs={6}>
                    <Box  
                    mt={1}
                    mx={2}                    
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{color:"#0F1833", backgroundColor: "#D3E8D3",borderRadius: '16px', paddingX:2}}                                
                            onClick={() => setDisablePassphrase(true) & setDisablePassword(false)}
                        >
                        Password 
                        </Button>
                    </Box>
                    <Box mt={1}></Box>
                  </Grid>
              </Grid>
                )}

            {!DisablePassphrase &&  (
                
                <PassphraseModal
                flagPassphrase={DisablePassphrase =>setDisablePassphrase(DisablePassphrase)}   
                NuevaPass={testPass => setTestPass(testPass) || setPassword(value.password=testPass) }                        
                />
                

            )}

            {!DisablePassword && (
                
                <PasswordModal
                flagPassword={DisablePassword =>setDisablePassword(DisablePassword)}   
                NuevaPass={testPass => setTestPass(testPass) || setPassword(value.password=testPass) }                        
                />
                //logro hacer que el hijo le pase la nueva contraseña al padre
                //(se puede ver volviendo mirando el log desp de apretar otra vez el boton password )
                //pero no se cómo cargarlo en el campo contraseña
                //EDIT: lo conseguí con el "|| setPassword(value.password=testPass)"
                

            )}

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