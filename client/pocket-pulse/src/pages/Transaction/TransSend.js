import React, { useEffect, useState } from 'react';
import { /**Container, Typography, Card, CardContent, IconButton,**/ Box, Stack } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import Two from './Two';
// import ActCard from './ActCard';
// import TransAct from './TransAct';
import ConnectAccount from './ConnectAccount';
import Blockchain from './Blockchain';

const StoredCardDetails = () => {
  const [storedCards, setStoredCards] = useState([]);

  useEffect(() => {
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

  const handleDelete = (cardId) => {
    const updatedCards = storedCards.filter(card => card.id !== cardId);
    setStoredCards(updatedCards);
    if (updatedCards.length > 0) {
      localStorage.setItem('cardDetails', JSON.stringify(updatedCards));
    } else {
      localStorage.removeItem('cardDetails');
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box>
          <Two />
        </Box>
        
        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Container maxWidth="sm" sx={{ mt: 14, ml: 3, boxShadow: 3, padding: 4, backgroundColor: '#fff' }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'poppins' }}>
            Card Details
          </Typography>
          {storedCards.length > 0 ? (
            storedCards.map((card) => (
              <Card key={card.id} sx={{ my: 2, background: '#2c3e50', color: 'white' }}>
                <CardContent sx={{ position: 'relative' }}>
                  <IconButton
                    sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
                    onClick={() => handleDelete(card.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="body1">Card Number: **** **** **** {card.cardNumber.slice(-4)}</Typography>
                  <Typography variant="body1">Card Holder: {card.cardHolder}</Typography>
                  <Typography variant="body1">Expiry Date: {card.expiryDate}</Typography>
                  <Typography variant="body1">CVV: ***</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" align="center">No saved cards available.</Typography>
          )} */}
        {/* <Box>
          <TransAct />
        </Box> */}

        {/* </Container>
      </Box> */}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConnectAccount />
          </Box>

      </Stack>

      <Blockchain/>
    </>
  );
};

export default StoredCardDetails;
