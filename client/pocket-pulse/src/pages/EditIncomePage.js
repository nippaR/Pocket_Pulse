// src/pages/EditIncomePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Box, Grid, Select, MenuItem,
  InputLabel, FormControl, Alert
} from '@mui/material';
import api from '../services/api';    // <-- Axios instance

function EditIncomePage() {
  const { id }   = useParams();       // /edit-income/:id  (Mongo _id)
  const navigate = useNavigate();

  /* ---------------------------------------------------------------- state */
  const [formData, setFormData] = useState({
    type: 'Income',
    amount: '',
    category: '',
    payer: '',
    dateReceived: '',
    description: '',
    associatedRental: '',
    file: null,
  });
  const [errorMessage, setError] = useState('');

  /* ------------------------------------------------------------- load record */
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const { data } = await api.get(`/incomes/${id}`);
        setFormData({
          type:            data.type          || 'Income',
          amount:          data.amount        || '',
          category:        data.category      || '',
          payer:           data.payer         || '',
          dateReceived:    data.dateReceived  ? data.dateReceived.substring(0,10) : '',
          description:     data.description   || '',
          associatedRental:data.associatedRental || '',
          file:            null,              // file handled separately
        });
      } catch (err) {
        console.error(err);
        setError('Could not load record.');
      }
    };
    fetchRecord();
  }, [id]);

  /* ------------------------------------------------ validation helpers */
  const isValid = () => {
    const amt = parseFloat(formData.amount);
    if (isNaN(amt))              return 'Amount must be a valid number.';
    if (amt < 0)                 return 'Amount cannot be negative.';
    const dateObj = new Date(formData.dateReceived);
    if (isNaN(dateObj))          return 'Please provide a valid date.';
    if (dateObj > new Date())    return 'Date cannot be in the future.';
    const words = formData.description.trim().split(/\s+/).filter(Boolean);
    if (words.length > 40)       return 'Description must be 40 words or fewer.';
    return '';
  };

  /* ----------------------------------------------------------- handlers */
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

  const handleSave = async (e) => {
    e.preventDefault();
    const err = isValid();
    if (err) { setError(err); return; }

    try {
      if (formData.file) {
        /* multipart for file */
        const fd = new FormData();
        Object.entries(formData).forEach(([k,v]) =>
          v !== null && v !== undefined && fd.append(k,v));
        await api.put(`/incomes/${id}`, fd,
          { headers: { 'Content-Type':'multipart/form-data' } });
      } else {
        const { file, ...payload } = formData;
        await api.put(`/incomes/${id}`, payload);
      }
      navigate('/records', { state:{ updated:true } });
    } catch (ex) {
      console.error(ex);
      setError(ex.response?.data?.msg || 'Server error');
    }
  };

  const handleBack = () => navigate('/records');

  /* prevent minus sign in number input */
  const blockMinus = (e) => (e.key === '-' || e.key === 'Subtract') && e.preventDefault();

  /* ------------------------------------------------------------------- JSX */
  return (
    <Container sx={{ my:4 }}>
      <Typography variant="h4" gutterBottom>Edit Income & Expense</Typography>

      {errorMessage && <Alert severity="error" sx={{ mb:2 }}>{errorMessage}</Alert>}

      <Box component="form" sx={{ p:2, border:'1px solid #ddd', borderRadius:2 }} onSubmit={handleSave}>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="type-label">Type</InputLabel>
              <Select labelId="type-label" name="type" label="Type"
                      value={formData.type} onChange={handleChange}>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth required label="Amount (USD)" name="amount"
                       type="number" inputProps={{ min:0 }}
                       value={formData.amount} onChange={handleChange}
                       onKeyDown={blockMinus}/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="cat-label">Category</InputLabel>
              <Select labelId="cat-label" label="Category" name="category"
                      value={formData.category} onChange={handleChange}>
                <MenuItem value=""><em>Select Category</em></MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="Deposit">Deposit</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth required label="Payer" name="payer"
                       value={formData.payer} onChange={handleChange}/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth required type="date" label="Date Received"
                       name="dateReceived" InputLabelProps={{ shrink:true }}
                       inputProps={{ max:new Date().toISOString().split('T')[0] }}
                       value={formData.dateReceived} onChange={handleChange}/>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} name="description"
                       label="Description (max 40 words)"
                       value={formData.description} onChange={handleChange}/>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="rent-label">Associated Rental</InputLabel>
              <Select labelId="rent-label" label="Associated Rental"
                      name="associatedRental" value={formData.associatedRental}
                      onChange={handleChange}>
                <MenuItem value="Property A">Property A</MenuItem>
                <MenuItem value="Property B">Property B</MenuItem>
                <MenuItem value="Property C">Property C</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb:1 }}>Attach a receipt or invoice</Typography>
            <Box sx={{ border:'2px dashed #ccc', p:2, textAlign:'center', borderRadius:1 }}>
              <input type="file" style={{ width:'100%' }} onChange={handleFileChange}/>
            </Box>
            {formData.file &&
              <Typography variant="body2" sx={{ mt:1 }}>Selected file: {formData.file.name}</Typography>}
          </Grid>
        </Grid>

        <Box sx={{ mt:2, display:'flex', justifyContent:'flex-end', gap:2 }}>
          <Button variant="outlined" onClick={handleBack}>Back</Button>
          <Button variant="contained" color="secondary" type="submit">Save</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditIncomePage;
