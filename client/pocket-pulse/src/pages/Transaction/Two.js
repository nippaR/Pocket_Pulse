//Transaction page

import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Alert } from '@mui/material';

const TwoAccountsTransaction = () => {
  const [transaction, setTransaction] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    date: ''
  });
  
  const [transactions, setTransactions] = useState([]);
  const [storedCards, setStoredCards] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    // To Account validation
    if (!transaction.toAccount) {
      newErrors.toAccount = 'Recipient account is required';
    } else if (!/^\d{16}$/.test(transaction.toAccount.replace(/\s/g, ''))) {
      newErrors.toAccount = 'Invalid account number (16 digits required)';
    }

    // Amount validation
    if (!transaction.amount) {
      newErrors.amount = 'Amount is required';
    } else if (Number(transaction.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    // Date validation
    if (!transaction.date) {
      newErrors.date = 'Date is required';
    } else if (transaction.date > today) {
      newErrors.date = 'Future dates are not allowed';
    }else if (transaction.date < today) {
        newErrors.date = 'Older days are not allowed';
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (error) {
        console.error('Error parsing saved transactions:', error);
        localStorage.removeItem('transactions');
      }
    }

    const savedCards = localStorage.getItem('cardDetails');
    if (savedCards) {
      try {
        setStoredCards(JSON.parse(savedCards));
      } catch (error) {
        console.error('Error parsing saved cards:', error);
        localStorage.removeItem('cardDetails');
      }
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } else {
      localStorage.removeItem('transactions');
    }
  }, [transactions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format toAccount input automatically
    if (name === 'toAccount') {
      const formattedValue = value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{4})/g, '$1 ') // Add spaces every 4 digits
        .trim();
      setTransaction(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setTransaction(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for the changed field
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTransaction = { 
        ...transaction, 
        id: Date.now(),
        amount: Number(transaction.amount).toFixed(2)
      };
      setTransactions(prev => [...prev, newTransaction]);
      setTransaction({ fromAccount: '', toAccount: '', amount: '', date: '' });
      setSuccessMessage('Transaction added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, ml: 2, mr: 2, boxShadow: 3, backgroundColor: '#fff', padding: 4, borderRadius: 8 }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ fontFamily: 'poppins' }}>
        Transaction With your Credit Card
      </Typography>

      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
    
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="From Account"
              name="fromAccount"
              value={transaction.fromAccount}
              onChange={handleChange}
            >
              {storedCards.length > 0 ? (
                storedCards.map((card) => (
                  <MenuItem key={card.id} value={card.cardNumber}>
                    **** **** **** {card.cardNumber.slice(-4)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No saved cards</MenuItem>
              )}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="To Account"
              name="toAccount"
              value={transaction.toAccount}
              onChange={handleChange}
              error={!!errors.toAccount}
              helperText={errors.toAccount}
              placeholder="1234 5678 9012 3456"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={transaction.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              inputProps={{ step: "0.01" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={transaction.date}
              onChange={handleChange}
              error={!!errors.date}
              helperText={errors.date}
            />
          </Grid>

          <Grid item xs={12}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit" 
              sx={{ borderRadius: 5, backgroundColor: 'orange' }}
            >
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TwoAccountsTransaction;