import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Login(props) {
    // const globalState = React.useContext(store);
    // const { dispatch } = globalState;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState("");
    //const browser = BrowserRouter();
    const route = Route();
    //const history = useHistory();
    //const classes = useStyles();
    const { ...rest } = props;
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!email || !password) {
        setErrors("Error: nombre y password son requeridos");
        //return false;
      }
  
      const { user, accessToken } = await checkUser(email, password);
  
      console.log(user, accessToken);
  
      if (user !== undefined) {
        user.accessToken = accessToken;
        localStorage.setItem("user", JSON.stringify(user));
        route.push("/MainScreen");
      }
  
      //setErrors("Error: nombre/password incorrecto");
      //return false;

      return (
      
        <Box height={'100vh'} display={'flex'} flexDirection={'column'}>
                    <Box flex={1} overflow={'auto'} flexDirection={'row'} alignItems={'flex-end'} display={'flex'} justifyContent={'center'}>
                        <Typography variant="h5" gutterBottom component="div" fontWeight={'500'}>
                            Sin datos almacenados
                        </Typography>
                    </Box>
                    <Box flex={1} overflow="auto" flexDirection={'row'} alignItems={'flex-start'} display={'flex'} justifyContent={'center'}>
                        <Box
                            sx={{
                                height: 56,
                                width: 56,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#9CF6B1',
                                boxShadow: '0px 0.25px 3px rgba(0, 0, 0, 0.039), 0px 2.75px 9px rgba(0, 0, 0, 0.19)',
                                borderRadius: 4
                            }}
                        >
                            <AddIcon
                                sx={{
                                    fontSize: 24
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
      
    );
    };
  
    
  }
  
  function checkUser(email, password){
      if(email=="test" && password == "1234"){
        return{
            email: true,
            password : true
        }
      }
      else{
          return{
              email: false,
              password: false
          }
      }
  }