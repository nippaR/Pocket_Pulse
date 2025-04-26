import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';

const ApplyInvestmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectName: '',
    investmentAmount: '',
    investmentType: '',
    paymentMethod: '',
    phoneNumber: '',
    proofOfFunds: null,
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    investmentAmount: '',
    investmentType: '',
    paymentMethod: '',
    phoneNumber: '',
    proofOfFunds: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = validateForm();
    setErrors(formErrors);

    // If there are no errors, handle form submission
    if (Object.values(formErrors).every((error) => error === '')) {
      console.log(formData);
      // Submit form data here, e.g., send it to the backend
    }
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.investmentAmount) formErrors.investmentAmount = 'Investment amount is required';
    else if (isNaN(formData.investmentAmount)) formErrors.investmentAmount = 'Investment amount must be a number';
    if (!formData.investmentType) formErrors.investmentType = 'Investment type is required';
    if (!formData.paymentMethod) formErrors.paymentMethod = 'Payment method is required';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'Phone number is required';
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) formErrors.phoneNumber = 'Phone number must be 10 digits';
    if (!formData.proofOfFunds) formErrors.proofOfFunds = 'Proof of funds is required';
    if (!formData.message) formErrors.message = 'Message is required';
    return formErrors;
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Apply for Investment in Project
      </Typography>

      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Investment Amount"
                name="investmentAmount"
                value={formData.investmentAmount}
                onChange={handleChange}
                variant="outlined"
                error={Boolean(errors.investmentAmount)}
                helperText={errors.investmentAmount}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(errors.investmentType)} required>
                <InputLabel>Investment Type</InputLabel>
                <Select
                  name="investmentType"
                  value={formData.investmentType}
                  onChange={handleChange}
                  label="Investment Type"
                >
                  <MenuItem value="Equity">Equity</MenuItem>
                  <MenuItem value="Debt">Debt</MenuItem>
                  <MenuItem value="Convertible">Convertible</MenuItem>
                </Select>
                <FormHelperText>{errors.investmentType}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(errors.paymentMethod)} required>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  label="Payment Method"
                >
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="PayPal">PayPal</MenuItem>
                </Select>
                <FormHelperText>{errors.paymentMethod}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                name="proofOfFunds"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
              {errors.proofOfFunds && <Typography color="error">{errors.proofOfFunds}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                error={Boolean(errors.message)}
                helperText={errors.message}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ApplyInvestmentForm;
