import React from 'react';
import { Box, Typography, Grid, Button, Card, /*CardContent, MenuItem, TextField */} from '@mui/material';
import { styled } from '@mui/system';

const SectionTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: '600',
  marginBottom: '1rem',
  textAlign: 'center',
});

const InvestmentCard = styled(Card)(({ theme }) => ({
  margin: '10px',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
}));

const CallToActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  marginTop: '20px',
}));

const UrbanGreenPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          Invest in a Greener Future with UrbanGreen
        </Typography>

      </Box>

      {/* Project Overview Section */}
      <SectionTitle>Project Overview</SectionTitle>
      <Typography variant="body1" paragraph>
        UrbanGreen is a visionary project aimed at transforming urban areas into eco-friendly spaces. The project focuses on building green parks, planting trees, and using renewable energy sources to create sustainable and livable urban environments.
      </Typography>

      {/* Investment Opportunities Section */}
      <SectionTitle>Investment Opportunities</SectionTitle>
      <Grid container spacing={3} justifyContent="center">
        {/* Tier 1 */}
        <Grid item xs={12} sm={4}>
          <InvestmentCard>
            <Typography variant="h6">Tier 1</Typography>
            <Typography variant="body1">Investment: $10,000 - $50,000</Typography>
            <Typography variant="body2" color="textSecondary">Return: 5% equity</Typography>
            <Typography variant="body2" paragraph>
              Benefits: Quarterly updates, invitations to project events.
            </Typography>
            <CallToActionButton variant="contained">Invest Now</CallToActionButton>
          </InvestmentCard>
        </Grid>

        {/* Tier 2 */}
        <Grid item xs={12} sm={4}>
          <InvestmentCard>
            <Typography variant="h6">Tier 2</Typography>
            <Typography variant="body1">Investment: $50,000 - $100,000</Typography>
            <Typography variant="body2" color="textSecondary">Return: 10% equity</Typography>
            <Typography variant="body2" paragraph>
              Benefits: Priority access to events, quarterly reports, direct contact with project leaders.
            </Typography>
            <CallToActionButton variant="contained">Invest Now</CallToActionButton>
          </InvestmentCard>
        </Grid>

        {/* Tier 3 */}
        <Grid item xs={12} sm={4}>
          <InvestmentCard>
            <Typography variant="h6">Tier 3</Typography>
            <Typography variant="body1">Investment: $100,000+</Typography>
            <Typography variant="body2" color="textSecondary">Return: 15% equity</Typography>
            <Typography variant="body2" paragraph>
              Benefits: Exclusive invitations, full project transparency, and personalized reports.
            </Typography>
            <CallToActionButton variant="contained">Invest Now</CallToActionButton>
          </InvestmentCard>
        </Grid>
      </Grid>

      {/* Impact Section */}
      <SectionTitle>Environmental & Social Impact</SectionTitle>
      <Typography variant="body1" paragraph>
        By investing in UrbanGreen, you are contributing to the creation of green spaces that will reduce pollution, improve mental and physical health in urban communities, and support biodiversity. Your investment helps promote sustainability and well-being in cities.
      </Typography>

      {/* Investment Timeline */}
      <SectionTitle>Project Timeline</SectionTitle>
      <Typography variant="body1" paragraph>
        <strong>Phase 1</strong> (Q1 2025): Planning and Initial Design  
        <br />
        <strong>Phase 2</strong> (Q2 2025 - Q4 2025): Construction of Green Spaces  
        <br />
        <strong>Phase 3</strong> (Q1 2026): Community Integration and Opening
      </Typography>

      

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <CallToActionButton variant="contained">Start Your Investment Today</CallToActionButton>
      </Box>
    </Box>
  );
};

export default UrbanGreenPage;
