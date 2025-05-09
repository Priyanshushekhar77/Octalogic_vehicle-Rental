import React from 'react';
import { Button, Box, LinearProgress, Typography } from '@mui/material';

const FormNavigation = ({ currentStep, totalSteps, isValid, handleNext, handleBack }) => {
  // Calculate progress percentage
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Step {currentStep + 1} of {totalSteps}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Math.round(progress)}%
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ mb: 3, height: 8, borderRadius: 4 }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!isValid}
        >
          {currentStep === totalSteps - 2 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default FormNavigation;