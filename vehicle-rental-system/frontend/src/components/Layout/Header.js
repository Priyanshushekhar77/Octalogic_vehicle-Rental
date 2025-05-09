import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vehicle Rental System
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;