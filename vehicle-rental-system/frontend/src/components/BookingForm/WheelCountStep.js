import React from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  FormHelperText 
} from '@mui/material';

const WheelCountStep = ({ formData, setFormData, errors, setErrors }) => {
  const handleWheelCountChange = (e) => {
    const value = e.target.value;
    
    // Reset related fields when wheel count changes
    setFormData({
      ...formData,
      wheelCount: value,
      vehicleTypeId: '',
      vehicleId: ''
    });
    
    // Clear errors
    const updatedErrors = { ...errors };
    delete updatedErrors.wheelCount;
    setErrors(updatedErrors);
  };

  return (
    <Box>
      <Typography variant="h5" className="question-title">
        Number of wheels
      </Typography>
      <FormControl 
        component="fieldset" 
        error={!!errors.wheelCount}
        required
        sx={{ width: '100%', mt: 2 }}
      >
        <RadioGroup
          name="wheelCount"
          value={formData.wheelCount || ''}
          onChange={handleWheelCountChange}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '100%'
          }}>
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="2 Wheels"
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 1,
                width: '100%',
                m: 0
              }}
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="4 Wheels"
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 1,
                width: '100%',
                m: 0
              }}
            />
          </Box>
        </RadioGroup>
        {errors.wheelCount && (
          <FormHelperText>{errors.wheelCount}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default WheelCountStep;