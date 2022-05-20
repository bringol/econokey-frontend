import * as React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from './Components/MainScreen';
import MainScreenNav from './Components/MainScreenNav';
import Passphrase from "./Components/Passphrase"

function App() {

  const accountList = [
    {id: 1, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass'},
    {id: 2, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet'},
    {id: 3, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note'},
    {id: 4, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass'},
    {id: 5, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet'},
    {id: 6, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note'},
    {id: 7, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass'},
    {id: 8, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet'},
    {id: 9, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note'},
    {id: 10, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass'},
    {id: 11, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet'},
    {id: 12, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note'},
    {id: 13, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass'},
    {id: 14, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet'},
    {id: 15, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note'}
  ];

  const [accounts, setAccounts] = React.useState(accountList);

  return (
    <>
      <MainScreenNav />
      <Container sx={{
        flex: 1,
        overflow: 'auto',
        height: '100%',
        p: 1
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainScreen accounts={accounts} />} />
          </Routes>
        </BrowserRouter>
        <Passphrase/>
      </Container>
      

    </>
  );
}

export default App;
