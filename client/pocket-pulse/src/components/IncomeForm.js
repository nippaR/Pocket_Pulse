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
  OutlinedInput,
} from '@mui/material';

const IncomeForm = ({ onAddIncome, onBack, maxDate }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    payer: '',
    dateReceived: '',
    description: '',
    associatedRental: '',
    file: null,
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files?.[0] || null,
    }));
  };

  // Validate required fields before submission
  const validateForm = () => {
    // Required fields: amount, category, payer, dateReceived
    if (!formData.amount || !formData.category || !formData.payer || !formData.dateReceived) {
      return 'Please fill in all required fields (Amount, Category, Payer, Date Received).';
    }
    // Additional validations (e.g., amount should be non-negative) can be added here.
    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum) || amountNum < 0) {
      return 'Amount must be a non-negative number.';
    }
    // Date validation: Although maxDate prevents future dates from calendar,
    // we add a check here too.
    const selectedDate = new Date(formData.dateReceived);
    const today = new Date();
    if (selectedDate > today) {
      return 'Date Received cannot be in the future.';
    }
    // Description: if provided, should be 30 words or fewer.
    if (formData.description) {
      const wordCount = formData.description.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > 30) {
        return 'Description must be 30 words or fewer.';
      }
    }
    return ''; // No errors
  };

  // Common handler for form submission
  const handleSubmit = (e, addAnother = false) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return; // Do not submit if there is an error.
    }
    // Clear error if validation passes.
    setErrorMessage('');
    // Call parent's function to add the income record.
    onAddIncome(formData, addAnother);

    // Clear form fields only if "Save & Add Another" is clicked.
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

  return (
    <Box
      component="form"
      sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}
      onSubmit={(e) => handleSubmit(e, false)}
    >
      <Typography variant="h6" gutterBottom>
        Add Income
      </Typography>
      <Typography variant="body2" paragraph>
        Log any payments received while owning and operating your rentals.
      </Typography>

      {/* Display error message if validation fails */}
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
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
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
            label="Description"
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
              <MenuItem value="">
                <em>Select Rental</em>
              </MenuItem>
              <MenuItem value="Property A">Property A</MenuItem>
              <MenuItem value="Property B">Property B</MenuItem>
              <MenuItem value="Property C">Property C</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* File Upload Field */}
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

      {/* Buttons */}
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
