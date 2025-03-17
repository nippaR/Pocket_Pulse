// src/pages/EditIncomePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';

function EditIncomePage() {
  const { rowIndex } = useParams(); // Get the index from URL (e.g. /edit-income/2)
  const navigate = useNavigate();

  // Local state for the form data
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    payer: '',
    dateReceived: '',
    description: '',
    associatedRental: '',
    file: null,
  });

  // State for error messages (validation failures)
  const [errorMessage, setErrorMessage] = useState('');

  // On mount, load the record from local storage and pre-fill the form
  useEffect(() => {
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      const incomeList = JSON.parse(stored);
      if (incomeList[rowIndex]) {
        const record = incomeList[rowIndex];
        setFormData({
          amount: record.amount || '',
          category: record.category || '',
          payer: record.payer || '',
          dateReceived: record.dateReceived || '',
          description: record.description || '',
          associatedRental: record.associatedRental || '',
          file: record.file || null,
        });
      }
    }
  }, [rowIndex]);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for file changes
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files?.[0] || null,
    }));
  };

  // Handler for Save button with validations
  const handleSave = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    // 1. Validate Amount: Must be a valid number and not negative.
    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum)) {
      setErrorMessage('Amount must be a valid number in USD.');
      return;
    }
    if (amountNum < 0) {
      setErrorMessage('Amount cannot be negative.');
      return;
    }

    // 2. Validate Date: Must not be a future date.
    const dateObj = new Date(formData.dateReceived);
    if (isNaN(dateObj.getTime())) {
      setErrorMessage('Please provide a valid date.');
      return;
    }
    const today = new Date();
    const dateOnly = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (dateOnly > todayOnly) {
      setErrorMessage('Date cannot be in the future.');
      return;
    }

    // 3. Validate Description: Must be 30 words or fewer.
    const wordCount = formData.description.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 30) {
      setErrorMessage('Description must be 30 words or fewer.');
      return;
    }

    // All validations passed, so update the record in local storage.
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      const incomeList = JSON.parse(stored);
      // Replace the record at the given index with updated formData.
      incomeList[rowIndex] = { ...formData };
      localStorage.setItem('incomesRecords', JSON.stringify(incomeList));
    }
    
    // Navigate back to the records page, passing a flag if needed.
    navigate('/records', { state: { updated: true } });
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Income
      </Typography>

      {/* Display an error alert if validation fails */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box
        component="form"
        sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}
        onSubmit={handleSave}
      >
        <Grid container spacing={2}>
          {/* Amount */}
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

          {/* Category */}
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
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="Deposit">Deposit</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Payer */}
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

          {/* Date Received */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Date Received"
              name="dateReceived"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split('T')[0] }}
              value={formData.dateReceived}
              onChange={handleChange}
            />
          </Grid>

          {/* Description */}
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

          {/* Associated Rental */}
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
                <MenuItem value="">Select Rental</MenuItem>
                <MenuItem value="Property A">Property A</MenuItem>
                <MenuItem value="Property B">Property B</MenuItem>
                <MenuItem value="Property C">Property C</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* File Upload */}
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

        {/* Save Button */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained" color="secondary" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditIncomePage;
