import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl
} from '@mui/material';

const IncomeForm = ({ onAddIncome, onBack }) => {
  // Local form state
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    payer: '',
    dateReceived: '',
    description: '',
    associatedRental: '',
    file: null, // store file object here
  });

  // Handle input changes for text/select fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files?.[0] || null,
    }));
  };

  // Common function to handle either "Save" or "Save & Add Another"
  const handleSubmit = (e, addAnother = false) => {
    e.preventDefault();

    // Pass data up to parent
    onAddIncome(formData, addAnother);

    // Reset the form if user clicked "Save & Add Another"
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

      <Grid container spacing={2}>
        {/* Amount */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Amount"
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
            InputLabelProps={{
              shrink: true,
            }}
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

        {/* File Upload (Receipt or Invoice) */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
            Attach a receipt or an invoice
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
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Selected file: {formData.file.name}
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={onBack}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmit(e, true)}
        >
          Save & Add Another
        </Button>

        <Button
          variant="contained"
          color="secondary"
          type="submit" 
        >
          Save
        </Button>
      </Box>

      <Typography
        variant="body2"
        color="error"
        sx={{ marginTop: 2 }}
      >
        * Required
      </Typography>
    </Box>
  );
};

export default IncomeForm;
