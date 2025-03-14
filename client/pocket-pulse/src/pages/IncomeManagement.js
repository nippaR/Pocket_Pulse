import React, { useState } from 'react';
import IncomeForm from '../components/IncomeForm';
import IncomeTable from '../components/IncomeTable';
import { Container, Typography } from '@mui/material';

const IncomeManagement = () => {
  // This array holds all submitted income records
  const [incomeList, setIncomeList] = useState([]);

  // This function runs when the form is submitted in IncomeForm
  const handleAddIncome = (formData, addAnother) => {
    // Add the new record to the existing list
    setIncomeList((prevList) => [...prevList, formData]);

    // If you want to do something differently for “Save & Add Another,”
    // you could handle that here with the 'addAnother' flag.
    // e.g., show a toast notification, etc.
  };

  // Called when user clicks the trash icon in IncomeTable
  const handleDeleteIncome = (index) => {
    setIncomeList((prevList) => prevList.filter((_, i) => i !== index));
  };

  // For the "Back" button in IncomeForm
  const handleBack = () => {
    // In a real app, you might use React Router’s useNavigate() or similar
    // For now, we’ll just log:
    console.log('Back button clicked - navigate away or handle as needed');
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Income Management
      </Typography>

      {/* The form for adding new income */}
      <IncomeForm
        onAddIncome={handleAddIncome}
        onBack={handleBack}
      />

      {/* The table to display all incomes */}
      <IncomeTable
        incomeList={incomeList}
        onDeleteIncome={handleDeleteIncome}
      />
    </Container>
  );
};

export default IncomeManagement;
