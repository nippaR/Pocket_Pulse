import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

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
  }, []);

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(txn => txn.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Transaction History
      </Typography>

      {transactions.length === 0 ? (
        <Typography variant="body1" align="center">No transactions found</Typography>
      ) : (
        <Grid container spacing={2}>
          {transactions.map((txn) => (
            <Grid item xs={12} key={txn.id}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="body1">From: **** **** **** {txn.fromAccount.slice(-4)}</Typography>
                  <Typography variant="body1">To: {txn.toAccount}</Typography>
                  <Typography variant="body1">Amount: ${txn.amount}</Typography>
                  <Typography variant="body1">Date: {txn.date}</Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(txn.id)}
                    sx={{ mt: 2 }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );

};

export default TransactionHistory;
