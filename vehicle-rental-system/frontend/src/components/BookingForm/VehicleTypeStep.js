import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { getVehicleTypes } from '../../services/api';

const VehicleTypeStep = ({ formData, setFormData, errors, setErrors }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      if (!formData.wheelCount) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getVehicleTypes(formData.wheelCount);
        setVehicleTypes(data);
        setFetchError(null);
      } catch (error) {
        console.error('Failed to fetch vehicle types:', error);
        setFetchError('Failed to load vehicle types. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [formData.wheelCount]);

  const handleVehicleTypeChange = (e) => {
    const value = e.target.value;
    
    // Reset vehicle selection when type changes
    setFormData({
      ...formData,
      vehicleTypeId: value,
      vehicleId: ''
    });
    
    // Clear errors
    const updatedErrors = { ...errors };
    delete updatedErrors.vehicleTypeId;
    setErrors(updatedErrors);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Box>
        <Typography color="error">{fetchError}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" className="question-title">
        Type of vehicle
      </Typography>
      {vehicleTypes.length === 0 ? (
        <Typography color="text.secondary">
          No vehicle types available for {formData.wheelCount} wheels. Please go back and select a different wheel count.
        </Typography>
      ) : (
        <FormControl 
          component="fieldset" 
          error={!!errors.vehicleTypeId}
          required
          sx={{ width: '100%', mt: 2 }}
        >
          <RadioGroup
            name="vehicleType"
            value={formData.vehicleTypeId || ''}
            onChange={handleVehicleTypeChange}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%'
            }}>
              {vehicleTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id.toString()}
                  control={<Radio />}
                  label={type.name}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    p: 1,
                    width: '100%',
                    m: 0
                  }}
                />
              ))}
            </Box>
          </RadioGroup>
          {errors.vehicleTypeId && (
            <FormHelperText>{errors.vehicleTypeId}</FormHelperText>
          )}
        </FormControl>
      )}
    </Box>
  );
};

export default VehicleTypeStep;