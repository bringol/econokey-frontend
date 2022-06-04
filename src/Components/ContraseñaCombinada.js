import React, { useState, useEffect } from 'react';
import {Avatar,Button,CssBaseline,TextField,Input ,Typography, Container, Box,Grid} from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import Indicador from "./PasswordStrMeter"
import {FaDiceD20,FaPlusCircle,FaMinusCircle} from 'react-icons/fa'
import {BsTrash} from "react-icons/bs"
import {ImFloppyDisk} from "react-icons/im"
import { NavLink } from 'react-router-dom';
import AppContext from '../AppContext';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'



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

const ContraseñaCombinada = (navigate) => {

  const { setTopbar, setFilterButton } = React.useContext(AppContext);
  const [passwordToCopy, setPasswordToCopy] = useState('Carpeta%Sombra%Hito%Tropical%Trece%Himno');

  useEffect(() => {
    setTopbar(true);
    setFilterButton(false);
  }, []);

  //Carpeta%Sombra%Hito%Tropical%Trece%Himno
  const handlePasswordToCopy = (event) => {
    setPasswordToCopy(event.target.value);
}
  const classes = useStyles();
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log(num);
    console.log(JSON.stringify(values))
    // console.log("Incluir Mayuscula?",flagMayuscula);
    // console.log("Incluir Minuscula?",flagMinuscula);
    // console.log("Incluir Numeros?",flagNumero);
    // console.log("Incluir Simbolos?",flagSimbolo);
    // console.log("Incluir ASCII?",flagASCII);
  }

  const copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };
  
  const [num, setNum] = useState(0);

 
  const [ password, setPassword ] = useState('');
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [disable, setDisable] = React.useState(true);

//No me cabe duda que debe haber una manera mas elegante

  const [flagMayuscula, setflagMayuscula] = React.useState(false);
  const handleMayuscula = (event) => {
    setflagMayuscula(event.target.checked);
  };

  const [flagMinuscula, setflagMinuscula] = React.useState(false);
  const handleMinuscula = (event) => {
    setflagMinuscula(event.target.checked);
  };

  const [flagNumero, setflagNumero] = React.useState(false);
  const handleNumero = (event) => {
    setflagNumero(event.target.checked);
  };

  const [flagSimbolo, setflagSimbolo] = React.useState(false);
  const handleSimbolo = (event) => {
    setflagSimbolo(event.target.checked);
  };

  const [flagASCII, setflagASCII] = React.useState(false);
  const handleASCII = (event) => {
    setflagASCII(event.target.checked);
  };
  



const [values, setValues]=React.useState({
    mayusculas:false,
    minusculas:false,
    numeros:false,
    simbolos:false,
    asciiExtendido:false,
    longitud: num,
    contraseña:"",
    entropia:"",

  })


  
  function sumar(){
    setNum(num+1)
   
  }

function restar() {
      if( num > 0)
      setNum(oldCount => oldCount - 1)

    }

  
    return (
      <Grid container className={classes.form} style={{borderStyle:"solid"}}>
           
          
          <form  autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item xs={12} >
                <Box 
                //style={{borderStyle:"solid"}}
                
                sx={{
                  mt: 2,
                  alignItems: 'flex-start',
                  paddingRight:5,   
                  paddingLeft:5,                 
                  marginBottom: "50px",               
                }}
                >
                    
                    <Typography variant="h5" gutterBottom component="div">
                    Generar Contraseña
                    </Typography>
                </Box>

                <Grid container>
                    
                    <FormGroup
                        sx={{
                        mt: -5,              
                        marginBottom: "10px",                  
                        paddingX:75,                                    
                        }}>
                        <FormControlLabel sx={{paddingY:1}}
                            control={<Switch />}
                            label="Mayúsculas [A-Z]"
                            checked={flagMayuscula}
                            onChange={handleMayuscula}                            
                            //labelPlacement="top"
                        />
                        <FormControlLabel sx={{paddingY:1}}
                            control={<Switch  />}
                            label="Minúsculas [a-z]"
                            checked={flagMinuscula}
                            onChange={handleMinuscula}
                        />
                        <FormControlLabel sx={{paddingY:1}}
                            control={<Switch  />}
                            label="Números [0-9]"
                            checked={flagNumero}
                            onChange={handleNumero}

                        />
                        <FormControlLabel sx={{paddingY:1}}
                            control={<Switch  />}
                            label="Símbolos Especiales /*+{..."
                            checked={flagSimbolo}
                            onChange={handleSimbolo}
                        />

                        <FormControlLabel sx={{paddingY:1}}
                            control={<Switch  />}
                            label="ASCII Extendido €Ž¶..."
                            checked={flagASCII}
                            onChange={handleASCII}
                            
                        />
                       
                    </FormGroup>
                    
                    </Grid>     
                
            </Grid>            

            

            <Grid item xs={12} >                      
                <Box 
                sx={{
                  mt: 0,
                  paddingRight:5,   
                  paddingLeft:5,                                 
                                 
                }}
                >
                
                <Typography variant="h6" gutterBottom component="div">
                    Longitud
                </Typography>
                  
                  <Typography sx={{ fontSize: 60 }}>
                    {num}
                  </Typography>
                     {/*Botón de restar palabra*/}              
                    <Button
                     onClick={restar}
                     sx={{ fontSize: 30,color:"#0F1833" }}                     
                     >
                       <FaMinusCircle/>                    
                     </Button>
                    {/*Botón de sumar palabra*/}  
                    <Button
                     onClick={sumar}
                     sx={{ fontSize: 30,color:"#0F1833" }}
                     >
                       <FaPlusCircle/>
                    </Button>
                
                
                </Box>
              </Grid>

                {/* DAAAADDOOOO */}
              <Grid item xs={12} >              
                  <Typography sx={{ fontSize: 25,mt:4}}>
                    Generar
                  </Typography>
                  <Button 
                  type="submit"
                  onSubmit={
                    handleChange(values.longitud=num) &&
                    handleChange(values.mayusculas=flagMayuscula) && 
                    handleChange(values.minusculas=flagMinuscula) &&
                    handleChange(values.numeros=flagNumero) &&
                    handleChange(values.simbolos=flagSimbolo) &&
                    handleChange(values.asciiExtendido=flagASCII)                  
                  }
                  onClick={() =>setDisable(!disable)} //muestra la contraseña, la entropía y desbloquea el boton utilizar
                  sx={{ fontSize: 80,color:"#0F1833"}}
                  >
                     <FaDiceD20 />
                  </Button>
                  <Box mt={5}></Box>
                </Grid>
            {!disable && (
               <Grid container spacing={1} justify="center">
                <Grid item xs={12} >
                <Box mt={1} mx={26}>      
                      <TextField  inputProps={{style: {textAlign: 'center',fontSize: 20.0}}} 
                      id="contraseña"
                      label="Contraseña"
                      variant="standard"
                      disabled                      
                      color="secondary"
                      size="normal"
                      multiline
                      maxRows={8}
                      onChange={e => setPassword(e.target.value)}
                      fullWidth
                      style = {{justifyContent:'center',width: '35%'}} 
                      defaultValue=".52<>]1I:LO`QnOd;5" //Longitud 18
                      />
                      </Box>
                      {/* <Indicador password={password} /> */}
                      <Box mt={1} ml={63}  mr={63}>  
                      <Indicador password=".52<>]1I:LO`QnOd;5" />

                  </Box>
                </Grid>
              </Grid>
            )}
            {!disable && (
            
                <Box m={1} >
            
                    <TextField inputProps={{style: {textAlign: 'center',fontSize: 25.0}}}
                    id="entropía"
                    //label="Entropía"
                    variant="standard"
                    color="secondary"
                    disabled //solo lectura
                    defaultValue="100 Bits de Entropía"
                                           
                    />
                </Box>
                
            
            )}
          
            <Grid container spacing={1} justify="center">

              <Grid item xs={6}>
                  <Box
                    mt={3}
                    ml={60}
                    //sx={{width: 50}}                  
                    >
                      <NavLink to="/" style={{ textDecoration: 'none'}}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{color:"#EB5757", backgroundColor: "#E7F2E8" ,borderRadius: '16px', paddingX:2.5}}                          
                          >
                          Cancelar <BsTrash/>
                        </Button>
                      </NavLink>                      
                  </Box>
                </Grid>
              
                <Grid item xs={6}>
                  <Box  
                  mt={3}
                  mr={60}
                  //sx={{width: 50}}
                  >
                    <NavLink to="/" style={{ textDecoration: 'none'}}>
                      <Button
                              type="submit"
                              //halfwidth
                              variant="contained"
                              sx={{color:"#0F1833", backgroundColor: "#D3E8D3",borderRadius: '16px', paddingX:4}}
                              disabled={disable}
                          >
                      Copiar <ImFloppyDisk />
                      </Button>
                    </NavLink>
                  </Box>
                  <Box mt={3}></Box>
                </Grid>
              </Grid>
          </form>
      </Grid>
    )  
}

export default ContraseñaCombinada