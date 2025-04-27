import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Card, CardContent, TextField, Accordion, AccordionSummary, AccordionDetails, Slider, Divider } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrowForwardIcon } from '@mui/icons-material';

// Styled components
const SectionTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: '600',
  marginBottom: '1rem',
  textAlign: 'center',
});

const InfoCard = styled(Card)(({ theme }) => ({
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  margin: '20px',
  backgroundColor: '#fff',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  marginTop: '10px',
}));

const InfoSection = styled(Box)(({ theme }) => ({
  marginTop: '40px',
  padding: '20px',
  backgroundColor: '#e7f2ff',
  borderRadius: '8px',
}));

const NewsSection = styled(Box)(({ theme }) => ({
  marginTop: '50px',
  padding: '20px',
  backgroundColor: '#f1f1f1',
  borderRadius: '8px',
}));

const FAQSection = styled(Box)(({ theme }) => ({
  marginTop: '50px',
  padding: '20px',
  backgroundColor: '#f1f1f1',
  borderRadius: '8px',
}));

const FAQItem = styled(Accordion)(({ theme }) => ({
  marginBottom: '10px',
}));

// FAQ Data
const faqData = [
  {
    question: '1. How is the safety of my investments and the funds I hold guaranteed?',
    answer: 'Your investment is secured by a first or second mortgage on the property, as well as other collateral (e.g., a surity or guarantee). Different projects have different risk mitigation measures, which you can find in the self-service under "Securities" in the project information for each project.'
  },
  {
    question: '2. Where can I find the legal documents needed to provide a tax report?',
    answer: 'You can find the required legal documents directly on your investor dashboard or contact our customer support team for assistance with tax-related documents.'
  },
  {
    question: '3. How much can I earn?',
    answer: 'Your earnings depend on the project and the chosen investment terms. Typically, investors can earn anywhere between 7% and 15% annually.'
  },
  {
    question: '4. What terms are applicable to investors?',
    answer: 'The terms include the minimum investment amount, the duration of the project, the interest rate, and the payment schedule. These terms are listed for each project on the investment page.'
  },
  {
    question: '5. What happens if the project owner is unable to repay the investment or interest on time?',
    answer: 'In such cases, we work with our legal team to initiate a process of recovery. However, please note that investments always carry some risk, and the entire amount could be lost.'
  },
];

const InvestmentPage = () => {
  const [investmentAmount, setInvestmentAmount] = useState(2000);

  // Slider handlers
  const handleAmountChange = (event, newValue) => {
    setInvestmentAmount(newValue);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* How to Start Investing Section */}
      <SectionTitle>How to Start Investing</SectionTitle>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" paragraph>
          It's simple to get started with investing. Just follow these steps:
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <InfoCard>
              <Typography variant="h6" gutterBottom>Create an Account</Typography>
              <Typography variant="body1">
                Create your account on the Profitus platform. Specify your contact and familiarize yourself with the rules.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} sm={4}>
            <InfoCard>
              <Typography variant="h6" gutterBottom>Verify Your Identity</Typography>
              <Typography variant="body1">
                Perform identity verification through the Onboard system. Top up your account and get ready to invest.
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} sm={4}>
            <InfoCard>
              <Typography variant="h6" gutterBottom>Start Investing</Typography>
              <Typography variant="body1">
                Choose the most suitable projects for you to invest in and start with just one click.
              </Typography>
            </InfoCard>
          </Grid>
        </Grid>
      </Box>

      {/* News Section */}
      <NewsSection>
        <SectionTitle>News</SectionTitle>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>What kind of investors will we raise?</Typography>
                <Typography variant="body1" paragraph>
                  Learn more about the types of investors we are targeting for this project.
                </Typography>
                <ActionButton variant="contained" fullWidth>
                  Read More
                </ActionButton>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>How to invest in real estate with just 10€?</Typography>
                <Typography variant="body1" paragraph>
                  Discover how you can start investing in real estate with minimal capital.
                </Typography>
                <ActionButton variant="contained" fullWidth>
                  Read More
                </ActionButton>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Real Estate Prices in Lithuania in 2025</Typography>
                <Typography variant="body1" paragraph>
                  Find out about the current trends and forecasts for real estate prices.
                </Typography>
                <ActionButton variant="contained" fullWidth>
                  Read More
                </ActionButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </NewsSection>

      {/* FAQ Section */}
      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        {faqData.map((faq, index) => (
          <FAQItem key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{faq.answer}</Typography>
            </AccordionDetails>
          </FAQItem>
        ))}
      </FAQSection>

      {/* Calculator Section */}
      <Divider sx={{ marginTop: '40px', marginBottom: '20px' }} />
      <SectionTitle>Investment Calculator</SectionTitle>
      <Typography variant="h6" align="center">
        Calculate your investment returns and how much you will earn over time.
      </Typography>
      <Slider
        value={investmentAmount}
        onChange={handleAmountChange}
        min={1000}
        max={100000}
        step={1000}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        sx={{ width: '100%', marginTop: '20px' }}
      />
      <Typography variant="body1" align="center">
        You will earn ${investmentAmount * 0.10} per year.
      </Typography>
    </Box>
  );
};

export default InvestmentPage;
