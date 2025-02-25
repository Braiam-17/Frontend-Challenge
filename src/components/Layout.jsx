import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import aridorbg from '../assets/aridorbg.png';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none',  letterSpacing: 1, '&:hover': {color: '#f5f5f5',textShadow: '0 0 8px rgba(255,255,255,0.4)',transform: 'scale(1.02)'} }}>
            Frontend Challenge
          </Typography>
        </Box>
        <Box 
          component="img" 
          src={aridorbg} 
          alt="Logo" 
          sx={{ height: 40 }}
          onClick={() => window.open('https://www.aridosoftware.com/', '_blank')}
          style={{ cursor: 'pointer' }}
        />
      </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;