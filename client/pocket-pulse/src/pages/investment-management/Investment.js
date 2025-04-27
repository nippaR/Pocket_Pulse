import React from 'react';
import { Container, Grid, Typography, Button, Card, CardMedia, CardContent, CardActions, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import invest5 from '../../Assets/invest5.png'; 
import investNewsImage from '../../Assets/invest-news.png'; // Corrected path for news image 1
import investNewsImage2 from '../../Assets/invest-news-2.jpeg'; // Corrected path for news image 2

const InvestmentPage = () => {
  // Define the investments data with the image included
  const investments = [
    {
      title: 'Villa Resort',
      interestRate: '6.5%',
      raised: '643,516',
      required: '1,000,000',
      image: invest5,  // Use the imported invest5 image here
    },
    {
      title: 'Senior Residences, Maliga II',
      interestRate: '6.2%',
      raised: '643,064',
      required: '1,000,000',
      image: 'https://via.placeholder.com/300x200', // Placeholder image
    },
    {
      title: 'Ocean III Suites, III',
      interestRate: '6.8%',
      raised: '642,090',
      required: '1,000,000',
      image: 'https://via.placeholder.com/300x200', // Placeholder image
    },
    {
      title: 'Vijaya Akani VI',
      interestRate: '6.3%',
      raised: '642,060',
      required: '1,000,000',
      image: 'https://via.placeholder.com/300x200', // Placeholder image
    },
  ];
  
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 5, backgroundColor: '#2C2E8C', p: 3, borderRadius: 2, width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
        <Typography variant="h3" gutterBottom color="white">
          Investments secured by real estate
        </Typography>
        <Typography variant="h6" gutterBottom color="white">
          Start investing in business loans secured by real estate today!
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='outlined' onClick={ () =>navigate('/create-pro')}>
          Add New Projects
        </Button>
      </Box>

      {/* Real Estate Investment Opportunities */}
      <Typography variant="h5" gutterBottom>
        Real estate loans investment opportunities
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {/* Investment Cards */}
        {investments.map((investment, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 345, backgroundColor: '#E8E8E8' }}>
              <CardMedia
                component="img"
                height="140"
                image={investment.image}  // Display the respective image here
                alt={investment.title}
              />
              <CardContent>
                <Typography variant="h6">{investment.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Investment: {investment.raised}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expected Return: {investment.interestRate}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ backgroundColor: '#FF6A13', color: 'white' }}>
                  Invest
                </Button>
                <Button size="small" sx={{ backgroundColor: '#2C2E8C', color: 'white' }}>
                  Learn more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How Real Estate Crowdfunding Works */}
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          How does real estate crowdfunding work?
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">For Businesses</Typography>
              <Typography variant="body1">
                Crowdfunding provides businesses with a great way to raise funds secured by real estate.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">For Investors</Typography>
              <Typography variant="body1">
                Investors can fund real estate projects and earn a return on their investment.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Key Stats */}
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          How Real Estate Crowdfunding Works
        </Typography>
        <Typography variant="h6">Community: 44,401</Typography>
        <Typography variant="h6">Total Crowdfunded: $25,424,213</Typography>
        <Typography variant="h6">Investors Earned: $16,209,731</Typography>
      </Box>

      {/* How to Start Investing */}
      <Box sx={{ mt: 5, backgroundColor: '#333333', p: 5, borderRadius: 2 }}>
        <Typography variant="h5" color="white" gutterBottom>
          How to start investing
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          1. Create an account.
        </Typography>
        <Typography variant="body1" color="white" gutterBottom>
          Create your account on the PROFIUS platform. Specify your contact details and familiarize yourself with the rules. It will only take a few minutes.
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          2. Verify your identity.
        </Typography>
        <Typography variant="body1" color="white" gutterBottom>
          Perform identity verification through the Onboarding system. Top up your account and get ready to invest. You can start with just 100 dollars.
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          3. Start investing.
        </Typography>
        <Typography variant="body1" color="white" gutterBottom>
          Get acquainted with active investments, choose the most acceptable project for you, and invest. You can also invest using the automatic investment function.
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          4. Earn more money!
        </Typography>
        <Typography variant="body1" color="white">
          Once a quarter, the project owner will pay you interest, and at the end of the investment period - he will return the entire investment. You can reinvest the received amount and earn more money!
        </Typography>
      </Box>

      {/* News Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          News
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={investNewsImage2}  // Use the second news image here
                alt="Invest News2"
              />
              <CardContent>
                <Typography variant="h6">What kind of investors will we raise?</Typography>
                <Typography variant="body2" color="text.secondary">
                  Investment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={investNewsImage}  // Use the first news image here
                alt="Invest News"
              />
              <CardContent>
                <Typography variant="h6">How to invest in Real Estate with just 10 Dollars!</Typography>
                <Typography variant="body2" color="text.secondary">
                  Investment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Frequently Asked Questions Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {/* Accordion for FAQ */}
        {[ 
          {
            question: "How is the safety of my investments and the funds I hold guaranteed?",
            answer: "Your investment is secured by a first or second mortgage on the property, as well as other collateral (e.g., a survey or guarantee). Different projects have different risk mitigation measures, which you can find in the self-service under 'Securities' in the project information for each project."
          },
          {
            question: "When can I expect the funds raised to provide a tax report?",
            answer: "Funds are raised quarterly, and you can request tax reports from your account page after the period ends."
          },
          {
            question: "How much can I earn?",
            answer: "You can earn anywhere from 5% to 12% annually based on the projects you invest in. The return varies depending on the investment terms and the project type."
          },
          {
            question: "What taxes are applicable to investors?",
            answer: "Taxes depend on your country of residence. Please consult with your local tax authorities to understand the specific taxes that apply to your investment earnings."
          },
          {
            question: "What happens if the project owner is unable to repay the investment or interest on time?",
            answer: "If a project defaults, Profius guarantees a partial refund or protection based on the investor’s contract. Any project-related issues will be addressed through our dispute resolution mechanism."
          }
        ].map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default InvestmentPage;
