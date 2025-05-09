// src/pages/IncomeManagement.js
import React, { useState } from 'react';
import {
  Container, Typography, Alert, FormControl, InputLabel, Select,
  MenuItem, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IncomeForm from '../components/IncomeForm';

const IncomeManagement = () => {
  const navigate = useNavigate();

  /* UI state */
  const [type, setType]         = useState('Income');   // Income | Expense
  const [showSuccess, setShowSuccess] = useState(false);

  /* Today’s date string for “max” attr */
  const todayStr = new Date().toISOString().split('T')[0];

  /* Called by IncomeForm after it POSTs to the API */
  const handleSaved = (addAnother = false) => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (!addAnother) navigate('/records');
    }, 3000);
  };

  /* Back button */
  const handleBack = () => navigate('/records');

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Income & Expense Management
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Record saved successfully!
        </Alert>
      )}

      {/* Type (Income / Expense) selector */}
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

      {/* Income / Expense form */}
      <IncomeForm
        selectedType={type}
        maxDate={todayStr}
        onSaved={handleSaved}   /* new callback */
        onBack={handleBack}
      />
    </Container>
  );
};

export default IncomeManagement;
