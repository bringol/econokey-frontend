import React, { useState } from 'react';
import {Avatar,Button,CssBaseline,TextField,Input ,Typography, Box,Grid} from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import CasinoIcon from '@mui/icons-material/Casino';
import Dropdown from './Dropdown';
import Contador from './Contador';
import Indicador from "./PasswordStrMeter"
import {FaDiceD20,FaPlusCircle,FaMinusCircle} from 'react-icons/fa'
import {BsTrash} from "react-icons/bs"
import {ImFloppyDisk} from "react-icons/im"



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
    backgroundColor: "#E7F2E8",
  },
  form: {
    //width: '100%', 
    // marginTop: "1px",
    textAlign: 'center',
    //display: 'flex',
    //flexDirection: 'column',
    backgroundColor: "#E7F2E8",
    //justifyContent: 'center',
    borderRadius: '16px', borderColor: 'black',display: 'flex', justifyContent: 'center'
    
  },
  submit: {
    margin: "8px",
  },
  botón: {
    // marginTop: "8px",
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // marginBottom: "100px",
    // backgroundColor: "#834e6d",
    size:"50px",

    
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
      <Grid container className={classes.form} style={{borderStyle:"solid"}}
        // sx={{ borderRadius: '16px', borderColor: 'black',display: 'flex', justifyContent: 'center' }}
         >
           
           <h2>Generar Passphrase</h2>
          <form  autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item xs={12} >
                <Box 
                // m={11}                
                //width= "140"
                // display="flex"
                // flexDirection="row-reverse"
                // alignItems= 'center'
                //style={{borderStyle:"solid"}}
                
                sx={{
                  mt: 3,
                  paddingRight:15,   
                  paddingLeft:15,                 
                  marginBottom: "50px",               
                }}
                >
                    <TextField  inputProps={{maxLength: 1,  style: {textAlign: 'center',fontSize: 40.0, height: 15.0}}}
                      
                      name="delimitador"
                      label="Delimitador"                    
                      color="secondary"
                      size="large"
                      //autoWidth                 
                      onChange={e => setDelim(e.target.value)}
                      />
                </Box>     
            </Grid>            

            <Grid item xs={12}>                      
                <Box mt={3}>
                    
                      <FormControl sx={{ m: 1, minWidth: 130 }}>
                        <InputLabel id="dropdown">Capitalización</InputLabel>
                        <Select
                          labelId="dropdown"
                          id="dropdown-autowidth"
                          value={cap}
                          //onChange={handleChange}
                          onChange={e => setCap(e.target.value)}
                          //autoWidth
                          label="Capitalización"
                        >
                          <MenuItem value="minúscula">
                            <em>minúscula</em>
                          </MenuItem>
                          <MenuItem value={"Título"}>Título</MenuItem>
                          <MenuItem value={"MAYÚSCULA"}>MAYÚSCULA</MenuItem>
                          
                        </Select>
                      </FormControl>
                    
                </Box>
            </Grid>            

                {/* <Contador/> */}

            <Grid item xs={12}>                      
                <Box mt={3}>
                <div>
                  <h2>Palabras</h2>
                  <Typography sx={{ fontSize: 60 }}>
                    {num}
                  </Typography>
                    
                    
                    <Button
                     onClick={restar}
                     sx={{ fontSize: 30,color:"#0F1833" }}
                     
                     >
                       <FaMinusCircle/>
                     
                     
                     </Button>
                    <Button
                     onClick={sumar}
                     sx={{ fontSize: 30,color:"#0F1833" }}
                     >
                       <FaPlusCircle/>
                    </Button>
                
                </div>
                </Box>
              </Grid>


              <Grid item xs={12} >              
                  <Typography sx={{ fontSize: 25,mt:8}}>
                    Generar
                  </Typography>
                  <Button 
                  type="submit"
                  sx={{ fontSize: 100,color:"#0F1833"}}
                  >
                     <FaDiceD20 />
                  </Button>
                
                </Grid>

                <Grid item xs={12} >
                <Box mt={3} m={3}>
            
                    <TextField 
                    id="contraseña"
                    label="Contraseña"
                    variant="standard"
                    //type="password"
                    color="secondary"
                    size="big"
                    maxRows={12}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth                          
                    />
                    <Indicador password={password} />

                </Box>
            </Grid>
            
            <Grid item xs={12} >
                <Box mt={3} m={3}>
            
                    <TextField 
                    id="entropía"
                    label="Entropía"
                    variant="standard"
                    //type="password"
                    color="secondary"
                    size="big"
                    maxRows={12}
                    //onChange={e => setPassword(e.target.value)}
                    fullWidth                          
                    />                   

                </Box>
            </Grid>
            <Grid container>

            <Grid item xs={6}>
                 <Box
                  mt={3}
                  // sx={{width: 100}}
                  >
                     <Button
                     type="submit"
                     halfWidth
                     variant="contained"
                     sx={{color:"#EB5757", backgroundColor: "#E7F2E8" ,borderRadius: '16px', paddingX:5}}
                     
                     >
                     Cancelar <BsTrash/> 
                     </Button>
                </Box>
            </Grid>
            
                <Grid item xs={6}>
                <Box  
                mt={3}
                
                // sx={{width: 100}}
                >
                    <Button
                            type="submit"
                            halfWidth
                            variant="contained"
                            //color="secondary"
                            //className={classes.botón}
                            sx={{color:"#0F1833", backgroundColor: "#D3E8D3",borderRadius: '16px', paddingX:5}}
                            
                        >
                    Utilizar <ImFloppyDisk />
                    </Button>
                </Box>
                </Grid>
                </Grid>
                </form>
            </Grid>

    )
  

  
}

export default Passphrase