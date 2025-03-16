// src/pages/IncomeManagement.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IncomeForm from '../components/IncomeForm';

const IncomeManagement = () => {
  const navigate = useNavigate();

  // Local state to hold income records (if needed for other logic)
  const [incomeList, setIncomeList] = useState([]);
  // State for error messages (if validations fail)
  const [errorMessage, setErrorMessage] = useState('');
  // State to control display of the success banner
  const [showSuccess, setShowSuccess] = useState(false);

  // Load existing records from Local Storage (if any) on mount
  useEffect(() => {
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      setIncomeList(JSON.parse(stored));
    }
  }, []);

  // Create today's date string in format "YYYY-MM-DD"
  const todayStr = new Date().toISOString().split('T')[0];

  // Called when the user submits the form
  const handleAddIncome = (formData, addAnother) => {
    // Clear any previous error (if using validations here)
    setErrorMessage('');

    // If validations pass, append the new record
    const updatedList = [...incomeList, formData];
    setIncomeList(updatedList);

    // Save the updated list to Local Storage
    localStorage.setItem('incomesRecords', JSON.stringify(updatedList));

    // Show success banner
    setShowSuccess(true);
    // Hide the banner after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    // Additional logic for "Save & Add Another" could go here if needed
  };

  // The Back button navigates to the records page
  const handleBack = () => {
    navigate('/records');
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Income Management
      </Typography>

      {/* Display error message if any */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Display success banner when record is saved */}
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Record saved successfully!
        </Alert>
      )}

      {/* Render the income form, passing today's date as maxDate */}
      <IncomeForm
        onAddIncome={handleAddIncome}
        onBack={handleBack}
        maxDate={todayStr}
      />
    </Container>
  );
};

export default IncomeManagement;
