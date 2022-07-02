import * as React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import MainScreen from './Components/MainScreen';
import MainScreenNav from './Components/MainScreenNav';
import Passphrase from './Components/Passphrase';
import ContraseñaCombinada from './Components/ContraseñaCombinada';
import Login from './Components/Login';
import Register from './Components/Register';
import NewAccount from './Components/NewAccount';
import { AppContextProvider } from './AppContext';
import NewNote from './Components/NewNote';
import NewCryptoWallet from './Components/NewCryptoWallet';
import NewCryptoWalletSelect from './Components/NewCryptoWalletSelect';
import NewCryptoWalletGenerador from './Components/NewCryptoWalletGenerador';
import IconCustom from './Icons/IconCustom';

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
          <Route path="/" element={<MainScreen navigate={navigate} />} />
          <Route path="/new-account" element={<NewAccount navigate={navigate} />} />
          <Route path="/new-note" element={<NewNote navigate={navigate} />} />
          <Route path="/new-wallet" element={<NewCryptoWalletSelect navigate={navigate} />} />
          <Route path="/wallet" element={<NewCryptoWallet navigate={navigate} />} />
          <Route path="/wallet-gen" element={<NewCryptoWalletGenerador navigate={navigate} />} />
          <Route path="/new-passphrase" element={<Passphrase navigate={navigate} />} />
          <Route path="/new-password" element={<ContraseñaCombinada navigate={navigate} />} />
          <Route path="/login" element={<Login navigate={navigate} />} />
          <Route path="/register" element={<Register navigate={navigate} />} />
          <Route path="/iconcustom" element={<IconCustom />} />
        </Routes>
      </Container>
    );
  }
  
  return (
    <>
      <AppContextProvider>
        <MainScreenNav />
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </AppContextProvider>
    </>
  );
}

export default App;
