import * as React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import MainScreen from './Components/MainScreen';
import MainScreenNav from './Components/MainScreenNav';
import Passphrase from './Components/Passphrase';
import Login from './Components/Login';
import Register from './Components/Register';
import {AppContextProvider} from './AppContext';

import ContraseñaCombinada from './Components/ContraseñaCombinada';


function App() {
  
  function Root() {
    const navigate = useNavigate();
    return (
      <Container sx={{
        flex: 1,
        overflow: 'auto',
        height: '100%',
        p: 1
      }}>
          <Routes>
            <Route path="/" element={<MainScreen navigate={navigate}/>} />
            <Route path="/new-passphrase" element={<Passphrase navigate={navigate}/>} />
            <Route path="/login" element={<Login navigate={navigate}/>} />
            <Route path="/register" element={<Register navigate={navigate}/>} />
          </Routes>
          
          

      </Container>
    );
  }
  

  return (
    <>
      <AppContextProvider>
        <MainScreenNav/>
        <BrowserRouter>
          <Root/>
        </BrowserRouter>
      </AppContextProvider>
    </>
  );
}

export default App;
