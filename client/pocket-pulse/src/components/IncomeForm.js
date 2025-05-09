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
import api from '../services/api';          // <-- Axios instance

const IncomeForm = ({ onSaved, onBack, maxDate, selectedType }) => {
  // --------------------------------------------------------------------- state
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    payer: '',
    dateReceived: '',
    description: '',
    associatedRental: '',
    file: null,               // receipt / invoice
  });
  const [errorMessage, setErrorMessage]   = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ------------------------------------------------------------------ handlers
  const handleAmountKeyDown = (e) => {
    if (e.key === '-' || e.key === 'Subtract') e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description') {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > 40) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) =>
    setFormData((prev) => ({ ...prev, file: e.target.files?.[0] || null }));

  // ------------------------------------------------------------ client validation
  const validate = () => {
    if (!formData.amount || !formData.category || !formData.payer || !formData.dateReceived)
      return 'Please fill in Amount, Category, Payer and Date.';
    const amt = parseFloat(formData.amount);
    if (isNaN(amt))           return 'Amount must be a valid number.';
    if (amt < 0)              return 'Amount cannot be negative.';
    const d = new Date(formData.dateReceived);
    if (d > new Date())       return 'Date Received cannot be in the future.';
    if (formData.description) {
      const words = formData.description.trim().split(/\s+/).filter(Boolean);
      if (words.length > 40)  return 'Description must be 40 words or fewer.';
    }
    return '';
  };

  // --------------------------------------------------------------- submit handler
  const saveRecord = async (addAnother) => {
    const err = validate();
    if (err) { setErrorMessage(err); return; }
    setErrorMessage('');

    // combine with selected type (Income / Expense)
    const payload = { ...formData, type: selectedType || 'Income' };

    try {
      // If file present, send multipart/form‑data ------------
      if (payload.file) {
        const data = new FormData();
        Object.entries(payload).forEach(([k, v]) => {
          if (v !== null && v !== undefined) data.append(k, v);
        });
        await api.post('/incomes', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/incomes', payload);   // JSON body
      }

      setSuccessMessage('Record saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

      // Inform parent (optional)
      onSaved && onSaved();

      // reset or not
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
    } catch (e) {
      console.error(e);
      setErrorMessage(e.response?.data?.msg || 'Server error');
    }
  };

  // ------------------------------------------------------------------- render
  const title = selectedType === 'Expense' ? 'Add Expense' : 'Add Income';

  return (
    <Box
      component="form"
      sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}
      onSubmit={(e) => { e.preventDefault(); saveRecord(false); }}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2" paragraph>
        Log any payments received or expenses incurred while operating your rentals.
      </Typography>

      {errorMessage   && <Alert severity="error"   sx={{ mb: 2 }}>{errorMessage}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

      <Grid container spacing={2}>
        {/* Amount ----------------------------------------------------- */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth required
            label="Amount (USD)"
            name="amount"
            type="number"
            inputProps={{ min: 0 }}
            value={formData.amount}
            onChange={handleChange}
            onKeyDown={handleAmountKeyDown}
          />
        </Grid>

        {/* Category --------------------------------------------------- */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="cat-label">Category</InputLabel>
            <Select
              labelId="cat-label"
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Deposit">Deposit</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem> {/* NEW */}
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Payer ------------------------------------------------------ */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth required
            label="Payer"
            name="payer"
            value={formData.payer}
            onChange={handleChange}
          />
        </Grid>

        {/* Date ------------------------------------------------------- */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth required
            label="Date Received"
            type="date"
            name="dateReceived"
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: maxDate }}
            value={formData.dateReceived}
            onChange={handleChange}
          />
        </Grid>

        {/* Description ------------------------------------------------ */}
        <Grid item xs={12}>
          <TextField
            fullWidth multiline rows={3}
            label="Description (max 40 words)"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        {/* Rental ----------------------------------------------------- */}
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel id="rent-label">Associated Rental</InputLabel>
            <Select
              labelId="rent-label"
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

        {/* File ------------------------------------------------------- */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Attach a receipt or invoice
          </Typography>
          <Box
            sx={{
              border: '2px dashed #ccc',
              p: 2, textAlign: 'center', borderRadius: 1, cursor: 'pointer',
            }}
          >
            <input type="file" style={{ width: '100%' }} onChange={handleFileChange} />
          </Box>
          {formData.file &&
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {formData.file.name}
            </Typography>}
        </Grid>
      </Grid>

      {/* Buttons ----------------------------------------------------- */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onBack}>Back</Button>
        <Button variant="contained" onClick={() => saveRecord(true)}>
          Save &amp; Add Another
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default IncomeForm;
