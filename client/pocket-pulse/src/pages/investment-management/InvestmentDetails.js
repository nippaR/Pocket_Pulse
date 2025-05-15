import React, { useState } from 'react';

// Correct image imports based on the folder structure
import firstpage from '../../Assets/firstpage.png';
import invest2 from '../../Assets/invest2.png';
import invest3 from '../../Assets/invest3.png';
import invest4 from '../../Assets/invest4.png';
import invest5 from '../../Assets/invest5.png';


import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  Euro,
  
  Star,
  QueryStats,
  CalendarMonth,
  Security,
  Schedule,
  Apartment,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';

// ImageCarousel Component
const ImageCarousel = () => {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    firstpage,
    invest2,
    invest3,
    invest4,
    invest5,
  ];

  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: '700px', margin: 'auto' }}>
      {/* Display the main image */}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <img
          src={images[activeImage]}
          alt={`carousel-${activeImage}`}
          style={{ width: '100%', borderRadius: '10px' }}
        />
        {/* Navigation Arrows */}
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            bgcolor: '#00000050',
            color: 'white',
            '&:hover': { backgroundColor: '#00000080' },
          }}
          onClick={handlePrev}
        >
          <KeyboardArrowLeft />
        </IconButton>

        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            bgcolor: '#00000050',
            color: 'white',
            '&:hover': { backgroundColor: '#00000080' },
          }}
          onClick={handleNext}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>

      {/* Thumbnails */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        {images.map((img, i) => (
          <Box
            key={i}
            onClick={() => setActiveImage(i)}
            sx={{
              width: 80,
              height: 50,
              cursor: 'pointer',
              borderRadius: '6px',
              border: activeImage === i ? '2px solid #ff4fd6' : '2px solid transparent',
            }}
          >
            <img
              src={img}
              alt={`thumb-${i}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
            />
          </Box>
        ))}
      </Box>

      {/* Currently Viewing */}
      <Typography sx={{ textAlign: 'center', mt: 1, color: '#ff4fd6' }}>
        Currently viewing {activeImage + 1}
      </Typography>
    </Box>
  );
};

// InvestmentDetails Page
const InvestmentDetails = () => {
  const invested = 448526.4;
  const required = 466000;
  const progress = (invested / required) * 100;
  const earnings = 368.0;
  const interestRate = 9.2;

  const infoItems = [
    {
      icon: <Euro sx={{ color: 'gold' }} />,
      label: 'Required amount',
      value: '€466,000.00',
    },
    {
      icon: <Star sx={{ color: 'gold' }} />,
      label: 'Project rating',
      value: 'A',
    },
    {
      icon: <QueryStats sx={{ color: 'gold' }} />,
      label: 'Loan To Value without VAT (LTV)',
      value: '15% (max. 85%)',
    },
    {
      icon: <CalendarMonth sx={{ color: 'gold' }} />,
      label: 'Loan duration',
      value: '24 month',
    },
    {
      icon: <Schedule sx={{ color: 'gold' }} />,
      label: 'Interest frequency',
      value: 'Once a quarter',
    },
    {
      icon: <Security sx={{ color: 'gold' }} />,
      label: 'Security measures',
      value: 'First rank mortgage',
    },
    {
      icon: <Schedule sx={{ color: 'gold' }} />,
      label: 'Interest rate',
      value: '8.6 - 10%',
    },
    {
      icon: <Apartment sx={{ color: 'gold' }} />,
      label: 'Financing purpose',
      value: 'RE development',
      color: '#f06292',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#0b061e', color: 'white', p: 3 }}>
      <Grid container spacing={3}>
        {/* Left: Carousel + thumbnails */}
        <Grid item xs={12} md={7}>
          <ImageCarousel />
        </Grid>

        {/* Right: Investment box */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              backgroundColor: '#1f0b3f',
              borderRadius: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              NATIVO Resort
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Kutninku str. Palanga
            </Typography>

            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={120}
                thickness={5}
                sx={{ color: '#ff4fd6' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="#ff4fd6">
                  {progress.toFixed(2)}%
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
              <Grid item>
                <Typography variant="body2">Invested</Typography>
                <Typography fontWeight="bold">
                  €{invested.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Required</Typography>
                <Typography fontWeight="bold">
                  €{required.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>

            {/* Investment options */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 1 }}>
              {[200, 500, required - invested].map((amt, idx) => (
                <Button
                  key={idx}
                  sx={{ bgcolor: '#2e1a63', color: 'white', px: 2 }}
                >
                  €{amt.toLocaleString()}
                </Button>
              ))}
            </Box>

            <TextField
              fullWidth
              variant="filled"
              defaultValue="2000"
              InputProps={{
                style: { backgroundColor: '#2e1a63', color: 'white' },
              }}
            />

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Typography variant="body2">Interest:</Typography>
                <Typography color="#ffb74d" fontWeight="bold">
                  {interestRate}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Earnings:</Typography>
                <Typography color="#ffb74d" fontWeight="bold">
                  €{earnings.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

            <Typography sx={{ mt: 2 }}>Days remaining</Typography>
            <Typography variant="h6" sx={{ color: '#ffb74d' }}>
              4 d.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: '#f06292',
                borderRadius: '30px',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#e91e63' },
              }}
            >
              Login
            </Button>

            <Typography
              variant="caption"
              sx={{ mt: 1, display: 'block', color: 'gray' }}
            >
              *The calculation provided is preliminary.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Investment Info Section */}
      <Paper
        elevation={4}
        sx={{
          mt: 4,
          backgroundColor: '#1f0b3f',
          borderRadius: 3,
          p: 3,
          color: 'white',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: '#ffcc00', fontWeight: 'bold', mb: 2 }}
        >
          Investment information
        </Typography>
        <Grid container spacing={3}>
          {infoItems.map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Box display="flex" alignItems="center" gap={1}>
                {item.icon}
                <Box>
                  <Typography variant="body2" sx={{ color: 'lightgray' }}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 'bold', color: item.color || 'white' }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Key Advantages Section */}
      <Paper
        elevation={3}
        sx={{
          mt: 2,
          backgroundColor: '#241654',
          borderRadius: 3,
          p: 3,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: '#ffcc00', fontWeight: 'bold', mb: 1 }}
        >
          Key advantages of the project
        </Typography>
        <Typography variant="body2" sx={{ color: 'lightgray' }} >
          Project details are confidential and only available to registered users
          of the platform. Please login or register to continue.
        </Typography>
      </Paper>
    </Box>
  );
};

export default InvestmentDetails;
