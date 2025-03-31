// src/pages/IncomeManagement.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IncomeForm from '../components/IncomeForm';

const IncomeManagement = () => {
  const navigate = useNavigate();

  // Local state to hold income (or expense) records
  const [incomeList, setIncomeList] = useState([]);

  // State for error messages (if validations fail)
  const [errorMessage, setErrorMessage] = useState('');

  // State to control display of the success banner
  const [showSuccess, setShowSuccess] = useState(false);

  // State for the selected type ("Income" or "Expense")
  const [type, setType] = useState('Income');

  // Load existing records from Local Storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      setIncomeList(JSON.parse(stored));
    }
  }, []);

  // Create today's date string in format "YYYY-MM-DD"
  const todayStr = new Date().toISOString().split('T')[0];

  // Called when the user submits the form.
  // The "addAnother" flag distinguishes "Save" vs "Save & Add Another".
  const handleAddIncome = (formData, addAnother) => {
    setErrorMessage('');

    // Include the currently selected "type" in the form data
    const recordWithType = {
      ...formData,
      type,
    };

    // Append the new record
    const updatedList = [...incomeList, recordWithType];
    setIncomeList(updatedList);

    // Save the updated list to Local Storage
    localStorage.setItem('incomesRecords', JSON.stringify(updatedList));

    // Show success banner and navigate if "Save" (not "Save & Add Another")
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (!addAnother) {
        navigate('/records');
      }
    }, 3000);
  };

  // Back button navigates to records page
  const handleBack = () => {
    navigate('/records');
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Income & Expense Management
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Record saved successfully!
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Pass selectedType and maxDate to IncomeForm */}
      <IncomeForm
        onAddIncome={handleAddIncome}
        onBack={handleBack}
        maxDate={todayStr}
        selectedType={type}
      />
    </Container>
  );
};

export default IncomeManagement;
