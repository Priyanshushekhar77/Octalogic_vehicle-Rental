import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const NameStep = ({ formData, setFormData, errors, setErrors }) => {
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, firstName: value });
    
    // Validation
    if (!value.trim()) {
      setErrors({ ...errors, firstName: 'First name is required' });
    } else {
      const updatedErrors = { ...errors };
      delete updatedErrors.firstName;
      setErrors(updatedErrors);
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, lastName: value });
    
    // Validation
    if (!value.trim()) {
      setErrors({ ...errors, lastName: 'Last name is required' });
    } else {
      const updatedErrors = { ...errors };
      delete updatedErrors.lastName;
      setErrors(updatedErrors);
    }
  };

  return (
    <Box>
      <Typography variant="h5" className="question-title">
        What is your name?
      </Typography>
      <Box sx={{ mt: 3 }}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={formData.firstName || ''}
          onChange={handleFirstNameChange}
          error={!!errors.firstName}
          helperText={errors.firstName || ''}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={formData.lastName || ''}
          onChange={handleLastNameChange}
          error={!!errors.lastName}
          helperText={errors.lastName || ''}
          required
        />
      </Box>
    </Box>
  );
};

export default NameStep;