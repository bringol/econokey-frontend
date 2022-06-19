import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Input, Typography, Container, Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Indicador from "./PasswordStrMeter"
import { FaDiceD20, FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { BsTrash } from "react-icons/bs"
import { ImFloppyDisk } from "react-icons/im"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from 'react-router-dom';
import AppContext from '../AppContext';
import { InputBase } from '@mui/material';
import { generator } from '../Controllers/WebService.controller';

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
    textAlign: 'center',
    backgroundColor: "#E7F2E8",
    borderRadius: '16px', borderColor: 'black', display: 'flex', justifyContent: 'center'
  },
  botón: {
    size: "50px",
  },
  centrado: {
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'justify',
    color: 'red'
  },

}));

const PassphraseModal = (props) => {

  const { setTopbar } = React.useContext(AppContext);
  const [passwordToCopy, setPasswordToCopy] = useState('');

  useEffect(() => {
    setTopbar(true);
  }, []);

  const handlePasswordToCopy = (event) => {
    setPasswordToCopy(event.target.value);
  }
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    async function componentDidMount() {
      let response = await generator();

      if (response.code === 200) {
        console.log(response.data.passphrase);
        setPasswordToCopy(response.data.passphrase);
      }
      else
        console.log(response.mensajeDetalle);
    }
    componentDidMount();
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


  const [password, setPassword] = useState('');

  const handleChange = (...prop) => (event) => {


    //setValues({ ...values, [prop]: event.target.value });
  };

  const [disable, setDisable] = React.useState(true);

  const [values, setValues] = React.useState({
    delimitador: "%",
    capitalizacion: "minúscula",
    palabras: num,
    contraseña: "",
    //entropia:"0 Bits de Entropía",


  })

  function entrop(longitud) {
    return (longitud * 12.925)
  }

  function sumar() {
    setNum(num + 1)
  }

  function restar() {
    if (num > 0)
      setNum(oldCount => oldCount - 1)
  }


  return (
    <Grid container className={classes.form} style={{ borderStyle: "solid" }}
    >


      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid item xs={12} >
          <Box
            sx={{
              mt: 2,
              alignItems: 'flex-start',
              paddingRight: 5,
              paddingLeft: 5,
              marginBottom: "50px",
            }}
          >

            <Typography variant="h5" gutterBottom component="div">
              Generar Passphrase
            </Typography>

            <TextField inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: 25.0, height: 15.0 } }}

              name="delimitador"
              label="Delimitador"
              color="secondary"
              size="normal"
              style={{ justifyContent: 'center', width: '60%' }}
              onChange={handleChange("delimitador")}
              value={values.delimitador}


            />

            <br />
            <FormControl sx={{ mt: 2, mb: 0, minWidth: 130 }}>
              <InputLabel id="dropdown">Capitalización</InputLabel>
              <Select
                labelId="dropdown"
                id="dropdown-autowidth"
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



        <Grid item xs={12} >
          <Box
            sx={{
              mt: 0,
              paddingRight: 5,
              paddingLeft: 5,


            }}
          >

            <Typography variant="h6" gutterBottom component="div">
              Cantidad de palabras
            </Typography>

            <Typography sx={{ fontSize: 60 }}>
              {num}
            </Typography>
            {/*Botón de restar palabra*/}
            <Button
              onClick={restar}
              sx={{ fontSize: 30, color: "#0F1833" }}
            >
              <FaMinusCircle />
            </Button>
            {/*Botón de sumar palabra*/}
            <Button
              onClick={sumar}
              sx={{ fontSize: 30, color: "#0F1833" }}
            >
              <FaPlusCircle />
            </Button>


          </Box>
        </Grid>

        {/* DADO */}
        <Grid item xs={12} >
          <Typography sx={{ fontSize: 25, mt: 4 }}>
            Generar
          </Typography>
          <Button
            type="submit"
            onSubmit={
              handleChange(/*values.palabras=num*/)
              /*&&
              handleChange(values.contraseña="Carpeta%Sombra%Hito%Tropical%Trece%Himno")     */
            }
            onClick={() =>
              setDisable(!disable)} //muestra la contraseña, la entropía y desbloquea el boton utilizar
            sx={{ fontSize: 100, color: "#0F1833" }}
          >
            <FaDiceD20 />
          </Button>
          <Box mt={5}></Box>
        </Grid>
        {!disable && (
          <Grid item xs={12} >
            <Box mt={3} m={3}>
              <InputBase
                id="contraseña"
                label="Contraseña"
                variant="standard"
                disabled
                color="secondary"
                size="big"
                multiline
                maxRows={8}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                defaultValue="Carpeta%Sombra%Hito%Tropical%Trece%Himno"
              />
              {/* <Indicador password={password} /> */}
              <Indicador password="Carpeta%Sombra%Hito%Tropical%Trece%Himno" />

            </Box>
          </Grid>
        )}
        {!disable && (
          <Grid item xs={12} >
            <Box mt={3} m={3}>

              <TextField inputProps={{ style: { textAlign: 'center', fontSize: 18.0 } }}
                id="entropía"
                variant="standard"
                color="secondary"
                size="big"
                disabled //solo lectura
                defaultValue={`${entrop(num).toFixed(2)} bits de Entropia`}
                fullWidth
              />
            </Box>
          </Grid>
        )}

        <Grid container>
          {/* Si no lo quiere que vuelva a seleccionar generar o que le de al
              botón Passphrase para cancelarlo */}
          {/* <Grid item xs={12}>
                  <Box
                    mt={3}
                    >
                        <Button
                          type="submit"
                          //halfwidth
                          variant="contained"
                          sx={{color:"#EB5757", backgroundColor: "#E7F2E8" ,borderRadius: '16px', paddingX:2.5}}
                          //onClick={()=> }
                          >
                          Descartar <BsTrash/>
                        </Button>
                      
                  </Box>
              </Grid> */}

          <Grid item xs={12}>
            <Box
              mt={3}
            >
              <Button //ver cómo setear el DisablePassphrase del padre desde acá una vez copiado
                type="submit"
                variant="contained"
                sx={{ color: "#0F1833", backgroundColor: "#D3E8D3", borderRadius: '16px', paddingX: 4 }}
                disabled={disable}
                onClick={() => (props.NuevaPass(values.contraseña) || props.flagPassphrase(true))}
              >
                Aplicar <ImFloppyDisk />
              </Button>
            </Box>
            <Box mt={3}></Box>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default PassphraseModal