import * as React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';

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
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
