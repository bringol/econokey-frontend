import React, { useState } from 'react';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import {Avatar,Button,CssBaseline,TextField,Typography,Container, Box,Grid} from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import CasinoIcon from '@mui/icons-material/Casino';
import Dropdown from './Dropdown';
import Contador from './Contador';
import Indicador from "./PasswordStrMeter"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "8px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: "100px",
  },
  avatar: {
    margin: "1px",
    backgroundColor: "#834e6d",
  },
  form: {
    width: '100%', 
    marginTop: "1px",
  },
  submit: {
    margin: "8px",
  },
  botón: {
    marginTop: "8px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: "100px",
    backgroundColor: "#834e6d",
  },
  centrado: {
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'justify',
    color: 'red'
  },
  

}));



const Passphrase = (navigate) => {
  const classes = useStyles();

  const handleOnClick = () => {
    navigate("../", { replace: true })
  };


  const [ password, setPassword ] = useState('');
  
    return (
      <Container component="main" maxWidth="xs">{/*ajustar para pantallas mas grandes*/}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CasinoIcon />
          </Avatar>
          <h2>Generar Passphrase </h2>

          <Contador/>{/*Si lo meto dentro del form no guarda porque hace refresh desp de cada button press*/}

          <form className={classes.form} noValidate>
          <Grid container direction="column">
            <Grid item xs={12}>

                <Box mt={3}>
                    <TextField sx={{ m: 1, width: 140, flexDirection: 'column', textAlign: 'center' }}
                    name="delimitador"
                    label="Delimitador"
                    //textAlign= "center"
                    //variant="standard"
                    color="secondary"
                    size="small"
                    //allign
                    required
                    />
                </Box>
            </Grid>

            <Grid item xs={12}>                      
                <Box mt={3}>
                    <Dropdown/>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box mt={3}>
            
                    <TextField 
                    id="contraseña"
                    label="Contraseña"
                    //variant="standard"
                    type="password"
                    color="secondary"
                    size="small"
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    required               
                    />
                    <Indicador password={password} />

                </Box>
            </Grid>
            <Grid item xs={6}>
                 <Box  mt={3} sx={{width: 150}}>
                     <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="secondary"
                     className={classes.botón}
                     onClick={handleOnClick}
                     >
                     Cancelar 
                     </Button>
                </Box>
            </Grid>
            
                <Grid item xs={6}>
                <Box  mt={3} sx={{width: 150}}>
                    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.botón}
                            onClick={handleOnClick}
                        >
                    Usar 
                    </Button>
                </Box>
                </Grid>

            </Grid>
                
            
            
          </form>
          
        </div>
      </Container>

    )
  

  
}

export default Passphrase