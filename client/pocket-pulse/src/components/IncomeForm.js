// src/components/IncomeForm.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';

const IncomeForm = ({ onAddIncome, onBack, maxDate, selectedType }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    payer: '',
    dateReceived: '',
    description: '',
    associatedRental: '',
    file: null, // Receipt/Invoice file
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Prevent typing the minus key in the amount field
  const handleAmountKeyDown = (e) => {
    if (e.key === '-' || e.key === 'Subtract') {
      e.preventDefault();
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // For description, enforce max 40 words as user types
    if (name === 'description') {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > 40) {
        return; // Prevent updating state if over limit
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files?.[0] || null,
    }));
  };

  // Validate fields before submission
  const validateForm = () => {
    if (!formData.amount || !formData.category || !formData.payer || !formData.dateReceived) {
      return 'Please fill in all required fields (Amount, Category, Payer, Date Received).';
    }
    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum)) {
      return 'Amount must be a valid number.';
    }
    if (amountNum < 0) {
      return 'Amount cannot be negative.';
    }
    // Date validation: ensure selected date is not in the future
    const selectedDate = new Date(formData.dateReceived);
    const today = new Date();
    if (selectedDate > today) {
      return 'Date Received cannot be in the future.';
    }
    // Description: must be 40 words or fewer
    if (formData.description) {
      const wordCount = formData.description.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > 40) {
        return 'Description must be 40 words or fewer.';
      }
    }
    return '';
  };

  // Handle form submission; "addAnother" distinguishes the two buttons
  const handleSubmit = (e, addAnother = false) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    onAddIncome(formData, addAnother);
    if (addAnother) {
      setFormData({
        amount: '',
        category: '',
        payer: '',
        dateReceived: '',
        description: '',
        associatedRental: '',
        file: null,
      });
    }
  };

  // Dynamic title based on selected type
  const formTitle = selectedType === 'Expense' ? 'Add Expense' : 'Add Income';

  return (
    <Box
      component="form"
      sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}
      onSubmit={(e) => handleSubmit(e, false)}
    >
      <Typography variant="h6" gutterBottom>
        {formTitle}
      </Typography>
      <Typography variant="body2" paragraph>
        Log any payments received or expenses incurred while operating your rentals.
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={2}>
        {/* Amount Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Amount (USD)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            onKeyDown={handleAmountKeyDown}
            inputProps={{ min: 0 }}
          />
        </Grid>

        {/* Category Field */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Deposit">Deposit</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Payer Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Payer"
            name="payer"
            value={formData.payer}
            onChange={handleChange}
          />
        </Grid>

        {/* Date Received Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Date Received"
            name="dateReceived"
            type="date"
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: maxDate }}
            value={formData.dateReceived}
            onChange={handleChange}
          />
        </Grid>

        {/* Description Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description (max 40 words)"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        {/* Associated Rental Field */}
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel id="rental-label">Associated Rental</InputLabel>
            <Select
              labelId="rental-label"
              label="Associated Rental"
              name="associatedRental"
              value={formData.associatedRental}
              onChange={handleChange}
            >
              <MenuItem value="Property A">Property A</MenuItem>
              <MenuItem value="Property B">Property B</MenuItem>
              <MenuItem value="Property C">Property C</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Receipt/Invoice File Field */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Attach a receipt or invoice
          </Typography>
          <Box
            sx={{
              border: '2px dashed #ccc',
              padding: 2,
              textAlign: 'center',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          >
            <input
              type="file"
              onChange={handleFileChange}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </Box>
          {formData.file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {formData.file.name}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" color="primary" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e, true)}>
          Save & Add Another
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default IncomeForm;
