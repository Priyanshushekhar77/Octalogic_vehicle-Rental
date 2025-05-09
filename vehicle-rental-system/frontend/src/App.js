import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro'; // ✅ Make sure it's from `-pro` if you're using Pro components
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // ✅ Adapter for DateFns

import BookingForm from './components/BookingForm/index';
import Header from './components/Layout/Header';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline />
      <Header />
      <Container>
        <BookingForm />
      </Container>
    </LocalizationProvider>
  );
}

export default App;
