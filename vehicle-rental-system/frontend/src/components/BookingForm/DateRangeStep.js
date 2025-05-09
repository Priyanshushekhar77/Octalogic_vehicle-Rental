import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, isAfter, isBefore } from 'date-fns';
import { checkVehicleAvailability } from '../../services/api';

const DateRangeStep = ({ formData, setFormData, errors, setErrors }) => {
  const [checking, setChecking] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const today = new Date();
  const maxDate = addDays(today, 90);

  const handleDateChange = async (newDateRange) => {
    const [startDate, endDate] = newDateRange;

    let dateErrors = {};
    let hasErrors = false;

    if (!startDate) {
      dateErrors.startDate = 'Start date is required';
      hasErrors = true;
    }

    if (!endDate) {
      dateErrors.endDate = 'End date is required';
      hasErrors = true;
    }

    if (startDate && endDate) {
      if (isBefore(endDate, startDate)) {
        dateErrors.dateRange = 'End date must be after start date';
        hasErrors = true;
      }

      if (isBefore(startDate, today)) {
        dateErrors.startDate = 'Start date cannot be in the past';
        hasErrors = true;
      }

      if (isAfter(endDate, maxDate)) {
        dateErrors.endDate = 'End date cannot be more than 90 days in the future';
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors({ ...errors, ...dateErrors });
      setAvailabilityChecked(false);
      return;
    }

    setFormData({ ...formData, startDate, endDate });

    const updatedErrors = { ...errors };
    delete updatedErrors.startDate;
    delete updatedErrors.endDate;
    delete updatedErrors.dateRange;
    setErrors(updatedErrors);

    if (formData.vehicleId && startDate && endDate) {
      try {
        setChecking(true);
        setAvailabilityChecked(false);
        setAvailabilityError(null);

        const response = await checkVehicleAvailability(
          formData.vehicleId,
          startDate.toISOString(),
          endDate.toISOString()
        );

        // Debugging the response
        console.log('API Response:', response);

        if (!response || !response.available) {
          setAvailabilityError('This vehicle is not available for the selected dates.');
        } else {
          setAvailabilityChecked(true);
        }
      } catch (error) {
        console.error('Error checking availability:', error);
        setAvailabilityError('Failed to check availability. Please try again.');
      } finally {
        setChecking(false);
      }
    } else {
      setAvailabilityError('Please select a valid vehicle and date range.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h5" className="question-title">
          Select Rental Dates
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Box display="flex" gap={2}>
            <DatePicker
              value={formData.startDate || null} // Ensure correct value here
              onChange={(date) => {
                setFormData({ ...formData, startDate: date }); // Update state when date is selected
                handleDateChange([date, formData.endDate]); // Call handleDateChange to validate
              }}
              minDate={today}
              maxDate={maxDate}
              renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
            />
            <DatePicker
              value={formData.endDate || null} // Ensure correct value here
              onChange={(date) => {
                setFormData({ ...formData, endDate: date }); // Update state when date is selected
                handleDateChange([formData.startDate, date]); // Call handleDateChange to validate
              }}
              minDate={formData.startDate || today} // Min date should be the selected start date
              maxDate={maxDate}
              renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
            />
          </Box>

          {(errors.startDate || errors.endDate || errors.dateRange) && (
            <Typography color="error" variant="caption">
              {errors.startDate || errors.endDate || errors.dateRange}
            </Typography>
          )}

          {checking && (
            <Box display="flex" alignItems="center" mt={2}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2">Checking availability...</Typography>
            </Box>
          )}

          {availabilityError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {availabilityError}
            </Alert>
          )}

          {availabilityChecked && !availabilityError && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Vehicle is available for the selected dates!
            </Alert>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeStep;
