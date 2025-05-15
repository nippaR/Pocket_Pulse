//Add to card details page

import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    IconButton
    } from '@mui/material';
    import DeleteIcon from '@mui/icons-material/Delete';

    const CardDetailsPage = () => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });
    
    const [submittedDetails, setSubmittedDetails] = useState([]);
    const [errors, setErrors] = useState({});
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedCards = localStorage.getItem('cardDetails');
        if (savedCards) {
        try {
            setSubmittedDetails(JSON.parse(savedCards));
        } catch (error) {
            console.error('Error parsing saved cards:', error);
            localStorage.removeItem('cardDetails');
        }
        }
    }, []);

    useEffect(() => {
        if (submittedDetails.length > 0) {
        localStorage.setItem('cardDetails', JSON.stringify(submittedDetails));
        } else {
        localStorage.removeItem('cardDetails');
        }
    }, [submittedDetails]);

    const validateForm = () => {
        const newErrors = {};
        if (!cardDetails.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Invalid card number (16 digits required)';
        }
        if (!cardDetails.cardHolder.trim()) {
        newErrors.cardHolder = 'Card holder name is required';
        }
        if (!cardDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
        }
        if (!cardDetails.cvv.match(/^\d{3,4}$/)) {
        newErrors.cvv = 'Invalid CVV (3-4 digits)';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
        if (editingId !== null) {
            setSubmittedDetails(prev => prev.map(card => card.id === editingId ? { ...cardDetails, id: editingId } : card));
            setEditingId(null);
        } else {
            const newCard = { ...cardDetails, id: Date.now() };
            setSubmittedDetails(prev => [...prev, newCard]);
        }
        setCardDetails({
            cardNumber: '',
            cardHolder: '',
            expiryDate: '',
            cvv: ''
        });
        }
    };

    const handleDelete = (cardId) => {
        setSubmittedDetails(prev => prev.filter(card => card.id !== cardId));
    };

    const handleEdit = (card) => {
        setCardDetails(card);
        setEditingId(card.id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({
        ...prev,
        [name]: value
        }));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, color:'white' }}>
        <Typography variant="h4" gutterBottom align="center">
            Card Details
        </Typography>

        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                fullWidth
                label="Card Holder Name"
                name="cardHolder"
                value={cardDetails.cardHolder}
                onChange={handleChange}
                error={!!errors.cardHolder}
                helperText={errors.cardHolder}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Expiry Date (MM/YY)"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleChange}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
                placeholder="MM/YY"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type="password"
                value={cardDetails.cvv}
                onChange={handleChange}
                error={!!errors.cvv}
                helperText={errors.cvv} 
                />
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                {editingId ? 'Update Card' : 'Add Card'}
                </Button>
            </Grid>
            </Grid>
        </form>

        {submittedDetails.length > 0 && (
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Saved Cards ({submittedDetails.length})
            </Typography>
        )}

        {submittedDetails.map((card) => (
            <Card key={card.id} sx={{ my: 2, background: '#2c3e50', color: 'white' }}>
            <CardContent sx={{ position: 'relative' }}>
                <Typography variant="body1">Card Number: **** **** **** {card.cardNumber.slice(-4)}</Typography>
                <Typography variant="body1">Card Holder: {card.cardHolder}</Typography>
                <Typography variant="body1">Expiry Date: {card.expiryDate}</Typography>
                <Typography variant="body1">CVV: ***</Typography>

                <IconButton sx={{ right: 8, top: 8, color: 'white' }} onClick={() => handleDelete(card.id)}>
                <DeleteIcon />
                </IconButton>
                <Button variant='outlined' onClick={() => handleEdit(card)} sx={{ left: 18, top: 8, color: 'white' }}>
                Edit
                </Button>
            </CardContent>
            </Card>
        ))}
        </Container>
    );
};

export default CardDetailsPage;