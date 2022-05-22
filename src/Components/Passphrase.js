import React, { useState } from 'react';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import {Avatar,Button,CssBaseline,TextField,Input ,Typography, Container, Box,Grid} from '@mui/material';
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
import { NavLink } from 'react-router-dom';

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

const Passphrase = (navigate) => {
  const classes = useStyles();
  const handleSubmit = event => {
    event.preventDefault();
    //console.log(delim,cap,num);
    //console.log(JSON.stringify(num))
    //console.log(values)
    console.log(JSON.stringify(values))

  }

  // const getNum2 = event => {

  //   console.log(JSON.stringify(num))
  // }
    

  // const [ delim, setDelim ] = useState(' ');

  // const [ cap, setCap ] = useState('minúscula');

  const [num, setNum] = useState(6);


  const [ password, setPassword ] = useState('');

  const handleOnClick = () => {
    navigate("../")
  };
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [values, setValues]=React.useState({
    delimitador:" ",
    capitalizacion:"minúscula",
    palabras: 0,
    contraseña:"",
    entropia:0,

  })

  /*En otro sprint debería encontrar la forma de pasar los datos al componente contador en lugar de hacerlo aca directamente*/
  function sumar(){
    setNum(num+1)
    //setValues((values.palabras)+1)
    //setValues((values.palabras)=setNum(num+1))
  }

function restar() {
      if( num > 0)
      setNum(oldCount => oldCount - 1)
      //setValues((values.palabras)=setNum(oldCount => oldCount - 1))
      //setValues(values.palabras => values.palabras - 1 )
    }

  
    return (
      <Grid container className={classes.form} style={{borderStyle:"solid"}}
        // sx={{ borderRadius: '16px', borderColor: 'black',display: 'flex', justifyContent: 'center' }}
         >
           
           <h2>Generar Passphrase</h2>
          <form  autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item xs={12} >
                <Box 
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
                      //onChange={e => setDelim(e.target.value)}
                      onChange={handleChange("delimitador")}

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
                          //onChange={handleChange} no usar
                          //value={cap}
                          //onChange={e => setCap(e.target.value)}
                          onChange={handleChange("capitalizacion")}
                          value={values.capitalizacion}
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
                
                </div>
                </Box>
              </Grid>

                {/* DAAAADDOOOO */}
              <Grid item xs={12} >              
                  <Typography sx={{ fontSize: 25,mt:8}}>
                    Generar
                  </Typography>
                  <Button 
                  type="submit"
                  //onSubmit={handleChange("palabras".getNum)}
                  //onSubmit={setValues({ ...values, palabras: palabras.getNum})}
                  //onSubmit={setPalabra}
                  onSubmit={handleChange(values.palabras=num)}//Cuando suceda el submit, guarda el valor de num (cant de palabras) en el Palabras del form
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
                    //ver metodos mostrar y esconder contraseña
                    color="secondary"
                    size="big"
                    maxRows={12}//por alguna razón no muestra el salto de línea
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
                  onClick={handleOnClick}
                  >
                    <NavLink to="/" style={{ textDecoration: 'none'}}>
                      <Button
                        type="submit"
                        halfwidth
                        variant="contained"
                        sx={{color:"#EB5757", backgroundColor: "#E7F2E8" ,borderRadius: '16px', paddingX:5}}
                        
                        >
                        Cancelar <BsTrash/>
                      </Button>
                    </NavLink>
                     
                </Box>
            </Grid>
            
                <Grid item xs={6}>
                <Box  
                mt={3}
                // sx={{width: 100}}
                onClick={handleOnClick}
                >
                  <NavLink to="/" style={{ textDecoration: 'none'}}>
                    <Button
                            type="submit"
                            halfwidth
                            variant="contained"
                            sx={{color:"#0F1833", backgroundColor: "#D3E8D3",borderRadius: '16px', paddingX:5}}
                            
                        >
                    Utilizar <ImFloppyDisk />
                    </Button>
                  </NavLink>
                </Box>
                </Grid>
                </Grid>
                </form>
            </Grid>
    )  
}

export default Passphrase