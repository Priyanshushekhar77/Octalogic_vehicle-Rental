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
import { getVehiclesByType } from '../../services/api';

const SpecificModelStep = ({ formData, setFormData, errors, setErrors }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!formData.vehicleTypeId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getVehiclesByType(formData.vehicleTypeId);
        setVehicles(data);
        setFetchError(null);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
        setFetchError('Failed to load vehicles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [formData.vehicleTypeId]);

  const handleVehicleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      vehicleId: value
    });
    
    // Clear errors
    const updatedErrors = { ...errors };
    delete updatedErrors.vehicleId;
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
        Specific Model
      </Typography>
      {vehicles.length === 0 ? (
        <Typography color="text.secondary">
          No vehicles available for the selected type. Please go back and select a different vehicle type.
        </Typography>
      ) : (
        <FormControl 
          component="fieldset" 
          error={!!errors.vehicleId}
          required
          sx={{ width: '100%', mt: 2 }}
        >
          <RadioGroup
            name="vehicle"
            value={formData.vehicleId || ''}
            onChange={handleVehicleChange}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%'
            }}>
              {vehicles.map((vehicle) => (
                <FormControlLabel
                  key={vehicle.id}
                  value={vehicle.id.toString()}
                  control={<Radio />}
                  label={`${vehicle.make} ${vehicle.model} (${vehicle.year})`}
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
          {errors.vehicleId && (
            <FormHelperText>{errors.vehicleId}</FormHelperText>
          )}
        </FormControl>
      )}
    </Box>
  );
};

export default SpecificModelStep;