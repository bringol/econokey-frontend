import React, { useState } from 'react';
import {Avatar,Button,CssBaseline,TextField,Input ,Container, Box,Grid} from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import CasinoIcon from '@mui/icons-material/Casino';
import Dropdown from './Dropdown';
import Contador from './Contador';
import Indicador from "./PasswordStrMeter"
import {FaDiceD20} from 'react-icons/fa'


//sacados del componente Dropdown, en el futuro encontrar manera de paramentrizar
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



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





const Passphrase = () => {
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    console.log(delim,cap,num);
  }

  const [ delim, setDelim ] = useState(' ');

  const [ cap, setCap ] = useState('minúscula');

  const [num, setNum] = useState(6);

  const [ password, setPassword ] = useState('');

  /*En otro sprint debería encontrar la forma de pasar los datos al componente contador en lugar de hacerlo aca directamente*/
  function sumar(){
    setNum(num+1)
  }

function restar() {
      if(num > 0)
      setNum(oldCount => oldCount - 1)
    }
 

  // console.log(state)

  
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
           <h2>Generar Passphrase </h2>
          

          <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container direction="column">
            <Grid item xs={12}>
                <Box mt={3}>
                    <TextField 
                    sx={{ m: 1, width: 140, flexDirection: 'column', textAlign: 'center' }}
                    inputProps={{maxLength: 1,}}
                      
                      name="delimitador"
                      label="Delimitador"                    
                      color="secondary"
                      size="small"                  
                      onChange={e => setDelim(e.target.value)}
                      />
                </Box>     
            </Grid>            

            <Grid item xs={12}>                      
                <Box mt={3}>
                    {/* <Dropdown/> */}
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 130 }}>
                        <InputLabel id="dropdown">Capitalización</InputLabel>
                        <Select
                          labelId="dropdown"
                          id="dropdown-autowidth"
                          value={cap}
                          //onChange={handleChange}
                          onChange={e => setCap(e.target.value)}
                          autoWidth
                          label="Capitalización"
                        >
                          <MenuItem value="minúscula">
                            <em>minúscula</em>
                          </MenuItem>
                          <MenuItem value={"Título"}>Título</MenuItem>
                          <MenuItem value={"MAYÚSCULA"}>MAYÚSCULA</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </div>
                </Box>
            </Grid>            

                {/* <Contador/> */}

            <Grid item xs={12}>                      
                <Box mt={3}>
                <div className="app">
                  <h4>Palabras</h4>
                  <p>{num}</p>
                    <button onClick={restar}>-</button>
                    <button onClick={sumar}>+</button>
                
                </div>
                </Box>
              </Grid>



                <div>
                  {/* <input name="generar"/> */}
                  <button type="submit"><FaDiceD20 /></button>
                </div>

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