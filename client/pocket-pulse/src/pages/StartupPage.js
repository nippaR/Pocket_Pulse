import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion'; // Import Framer Motion

const StartupPage = () => {
  return (
    <Container
      maxWidth="xl" // Ensures container spans full width
      sx={{
        mt: 0, // Remove margin-top
        padding: 0, // Remove padding
        margin: 0, // Remove margin
        backgroundColor: '#1a1a1a', // Set background to black
        height: '100vh', // Ensure the container fills the entire screen height
        display: 'flex', // Flex display for full width
        flexDirection: 'column', // Make sure elements are stacked
        justifyContent: 'center', // Center content vertically
        color: '#f1f1f1', // White text
      }}
    >
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start from invisible and above
        animate={{ opacity: 1, y: 0 }}   // Animate to visible and original position
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          sx={{ mb: 3, color: '#f57c00' }} // Orange color for heading
        >
          Startup A - An Innovative Tech Startup for AI Solutions
        </Typography>
      </motion.div>

      {/* Project Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Goal:</strong> Revolutionizing AI solutions for businesses. Our mission is to empower companies with cutting-edge AI technology that drives productivity, innovation, and profitability.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Investment Return:</strong> 15% annually
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          <strong>Duration:</strong> 5 years
        </Typography>
      </motion.div>

      {/* Image Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <motion.img
            src="https://via.placeholder.com/600x400" // Replace with your project image URL
            alt="Startup A"
            style={{ width: '100%', borderRadius: '8px' }}
            initial={{ opacity: 0, scale: 0.8 }} // Start slightly smaller and invisible
            animate={{ opacity: 1, scale: 1 }}   // Animate to full size and visible
            transition={{ duration: 1, delay: 0.5 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Typography variant="body2" sx={{ mt: 2 }}>
              Learn more about the project and how AI is revolutionizing the industry. Our AI solutions are already being implemented in several major sectors, and we are ready to scale.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      {/* Video Section */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: '#f57c00' }}>
          Watch Our Introduction Video
        </Typography>
        <motion.iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/g1WG4D0Aiek" // Replace with your YouTube video ID
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>

      {/* Animated Investment Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontWeight: 'bold',
              backgroundColor: '#f57c00',
              '&:hover': { backgroundColor: '#ff5722' },
            }} // Orange button
          >
            Invest Now
          </Button>
        </motion.div>
      </div>
    </Container>
  );
};

export default StartupPage;
