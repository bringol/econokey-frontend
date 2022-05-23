import * as React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom';
import MainScreen from './Components/MainScreen';
import MainScreenNav from './Components/MainScreenNav';
import Passphrase from './Components/Passphrase';
import Login from './Components/Login';
import Register from './Components/Register';
function App() {

  const accountList = [
    {id: 1, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass', usuario: 'email@gmail.com', password: 'Carpeta%Sombra%Hito%Tropical%Trece%Himno', comentario: 'gmail principal', url: 'http://link'},
    {id: 2, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet', usuario: 'email@gmail.com', password: 'strongpass2', comentario: 'gmail principal', url: 'http://link'},
    {id: 3, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note', comentario: 'gmail principal'}
  ];

  const [accounts, setAccounts] = React.useState(accountList);
  const [topbar, setTopbar] = React.useState(false);

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
            <Route path="/" element={<MainScreen accounts={accounts} navigate={navigate} setTopbar={setTopbar}/>} />
            <Route path="/new-passphrase" element={<Passphrase navigate={navigate}/>} />
            <Route path="/login" element={<Login navigate={navigate}/>} />
            <Route path="/register" element={<Register navigate={navigate}/>} />
          </Routes>
      </Container>
    );
  }
  

  return (
    <>
      <MainScreenNav topbar = {topbar}/>
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    </>
  );
}

export default App;
