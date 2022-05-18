import * as React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from './Components/MainScreen';

function App() {

  const accountList = [
    {id: 1, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass'},
    {id: 2, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet'},
    {id: 3, titulo: 'Notas', descripcion: 'No te olvides de tomar agua', type: 'note'}
  ];

  const [accounts, setAccounts] = React.useState(accountList);

  return (
    <>
      <Container fluid
        sx={{
          bgcolor: '#FBFDF7'
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainScreen accounts={accounts} />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
