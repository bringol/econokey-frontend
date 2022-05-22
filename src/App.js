import * as React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom';
import MainScreen from './Components/MainScreen';
import MainScreenNav from './Components/MainScreenNav';
import Passphrase from './componentes/Passphrase';
function App() {

  const accountList = [
    {id: 1, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass', usuario: 'email@gmail.com', password: 'tesst123', comentario: 'gmail principal', url: 'http://link'},
    {id: 2, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet', usuario: 'email@gmail.com', password: 'strongpass2', comentario: 'gmail principal', url: 'http://link'},
    {id: 3, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note', comentario: 'gmail principal'},
    {id: 4, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass', usuario: 'email@gmail.com', password: 'password', comentario: 'gmail principal', url: 'http://link'},
    {id: 5, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet', usuario: 'email@gmail.com', password: 'password', comentario: 'gmail principal', url: 'http://link'},
    {id: 6, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note', comentario: 'gmail principal'},
    {id: 7, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass', usuario: 'email@gmail.com', password: 'password', comentario: 'gmail principal', url: 'http://link'},
    {id: 8, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet', usuario: 'email@gmail.com', password: 'password', comentario: 'gmail principal', url: 'http://link'},
    {id: 9, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note', comentario: 'gmail principal'},
    {id: 10, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass', usuario: 'email@gmail.com', password: 'password', comentario: 'gmail principal', url: 'http://link'},
    {id: 11, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet', usuario: 'email@gmail.com', password: 'password', comentario: 'gmail principal', url: 'http://link'},
    {id: 12, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note', comentario: 'gmail principal'},
    {id: 13, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass', usuario: 'email@gmail.com', password: 'password', comentario: 'gmail principal', url: 'http://link'},
    {id: 14, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet', usuario: 'email@gmail.com', password: 'password', comentario: 'gmail principal', url: 'http://link'},
    {id: 15, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note', comentario: 'gmail principal'}
  ];

  const [accounts, setAccounts] = React.useState(accountList);

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
            <Route path="/" element={<MainScreen accounts={accounts} navigate={navigate} />} />
            <Route path="/new-passphrase" element={<Passphrase navigate={navigate}/>} />
          </Routes>
      </Container>
    );
  }
  

  return (
    <>
      <MainScreenNav/>
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    </>
  );
}

export default App;
