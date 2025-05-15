import React, { useContext } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { TransactionContext } from '../../contex/TransactionContext';
import Loader from './Loader';

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <TextField
        label={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}
        fullWidth
        margin="normal"
        variant="outlined"
    />
    );

    export default function Transfer() {
    const {
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        handleChange,
    } = useContext(TransactionContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { addressTo, amount, keyword, message } = formData;
        if (!addressTo || !amount || !keyword || !message) return;
        console.log('Form data', formData);
        console.log('Sending transaction...');
        sendTransaction();
    };

    return (
        <Box sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
            Transfer
        </Typography>

        {!currentAccount && (
            <Box textAlign="center" mb={2}>
            <Button variant="contained" color="primary" onClick={connectWallet}>
                Connect Wallet
            </Button>
            </Box>
        )}

        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
            maxWidth: 400,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            }}
        >
            <Input
            placeholder="Address To"
            name="addressTo"
            type="text"
            value={formData.addressTo}
            handleChange={handleChange}
            />
            <Input
            placeholder="Amount (ETH)"
            name="amount"
            type="number"
            value={formData.amount}
            handleChange={handleChange}
            />
            <Input
            placeholder="Keyword (Gif)"
            name="keyword"
            type="text"
            value={formData.keyword}
            handleChange={handleChange}
            />
            <Input
            placeholder="Message"
            name="message"
            type="text"
            value={formData.message}
            handleChange={handleChange}
            />

            {/* Loader Example - You can also use <CircularProgress /> from MUI */}
            {false ? (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
            ) : (
            <Button variant="contained" color="secondary" type="submit">
                Send Now
            </Button>
            )}
        </Box>
        </Box>
    );
}
