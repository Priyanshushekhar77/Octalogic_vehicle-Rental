import React from 'react';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { format } from 'date-fns';

const SuccessStep = ({ formData, resetForm }) => {
  return (
    <Box textAlign="center">
      <CheckCircleIcon 
        sx={{ fontSize: 64, color: 'success.main', mb: 2 }}
      />
      <Typography variant="h5" gutterBottom>
        Booking Confirmed!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Thank you for your booking. Your vehicle has been reserved.
      </Typography>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mt: 3, 
          mb: 3, 
          backgroundColor: '#f9f9f9',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom>
          Booking Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ textAlign: 'left' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Name:</Typography>
            <Typography variant="body1">{formData.firstName} {formData.lastName}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Start Date:</Typography>
            <Typography variant="body1">
              {formData.startDate ? format(formData.startDate, 'MMM dd, yyyy') : 'N/A'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">End Date:</Typography>
            <Typography variant="body1">
              {formData.endDate ? format(formData.endDate, 'MMM dd, yyyy') : 'N/A'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Booking Reference:</Typography>
            <Typography variant="body1">
              {formData.bookingId || 'BOOKING-' + Math.floor(Math.random() * 10000)}
            </Typography>
          </Box>
        </Box>
      </Paper>
      
      <Button 
        variant="contained" 
        onClick={resetForm}
        sx={{ mt: 2 }}
      >
        Make Another Booking
      </Button>
    </Box>
  );
};

export default SuccessStep;