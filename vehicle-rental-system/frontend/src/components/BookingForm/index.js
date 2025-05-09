import React, { useState, useEffect } from 'react';
import { Box, Paper, Alert, Snackbar } from '@mui/material';
import NameStep from './NameStep';
import WheelCountStep from './WheelCountStep';
import VehicleTypeStep from './VehicleTypeStep';
import SpecificModelStep from './SpecificModelStep';
import DateRangeStep from './DateRangeStep';
import SuccessStep from './SuccessStep';
import FormNavigation from './FormNavigation';
import { createBooking } from '../../services/api';

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheelCount: '',
    vehicleTypeId: '',
    vehicleId: '',
    startDate: null,
    endDate: null
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Name step
        return !!(formData.firstName && formData.lastName && !errors.firstName && !errors.lastName);
      case 1: // Wheel count step
        return !!formData.wheelCount && !errors.wheelCount;
      case 2: // Vehicle type step
        return !!formData.vehicleTypeId && !errors.vehicleTypeId;
      case 3: // Specific model step
        return !!formData.vehicleId && !errors.vehicleId;
      case 4: // Date range step
        return !!(
          formData.startDate && 
          formData.endDate && 
          !errors.startDate && 
          !errors.endDate && 
          !errors.dateRange
        );
      default:
        return true;
    }
  };

  // Handle next button click
  const handleNext = async () => {
    if (currentStep === 4) {
      // Submit the form
      await handleSubmit();
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  // Handle back button click
  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      
      const bookingData = {
        userId: null, // Will be created on the backend
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: formData.vehicleId,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString()
      };
      
      const response = await createBooking(bookingData);
      
      // Update form data with booking ID
      setFormData({
        ...formData,
        bookingId: response.id || response.bookingId
      });
      
      // Move to success step
      setCurrentStep(5);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitError('Failed to create booking. Please try again.');
      setShowErrorToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form to start a new booking
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      wheelCount: '',
      vehicleTypeId: '',
      vehicleId: '',
      startDate: null,
      endDate: null
    });
    setErrors({});
    setCurrentStep(0);
  };

  // Close error toast
  const handleCloseToast = () => {
    setShowErrorToast(false);
  };

  // Render current step
  const renderStep = () => {
    const commonProps = {
      formData,
      setFormData,
      errors,
      setErrors
    };
    
    switch (currentStep) {
      case 0:
        return <NameStep {...commonProps} />;
      case 1:
        return <WheelCountStep {...commonProps} />;
      case 2:
        return <VehicleTypeStep {...commonProps} />;
      case 3:
        return <SpecificModelStep {...commonProps} />;
      case 4:
        return <DateRangeStep {...commonProps} />;
      case 5:
        return <SuccessStep formData={formData} resetForm={resetForm} />;
      default:
        return null;
    }
  };

  const totalSteps = 6;

  return (
    <Box className="form-container">
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        {renderStep()}
        
        {currentStep < 5 && (
          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            isValid={isCurrentStepValid()}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
      </Paper>
      
      <Snackbar
        open={showErrorToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {submitError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingForm;