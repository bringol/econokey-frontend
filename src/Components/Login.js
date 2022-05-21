import React from "react";
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
        return false;
      }
  
      const { user, accessToken } = await checkUser(email, password);
  
      console.log(user, accessToken);
  
      if (user !== undefined) {
        user.accessToken = accessToken;
        localStorage.setItem("user", JSON.stringify(user));
        route.push("/MainScreen");
      }
  
      setErrors("Error: nombre/password incorrecto");
      return false;
    };
  
    return (
      <></>
    );
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