import logo from './logo.svg';
import './App.css';
import { Container, Box, Typography, Link } from '@mui/material';
import ProTip from './Components/ProTip.js';
import Album from './Components/Album';

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Album/>
      </Box>
    </Container>
  );
}

export default App;
