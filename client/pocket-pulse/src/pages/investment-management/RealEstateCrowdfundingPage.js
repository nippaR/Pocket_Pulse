import React from 'react';
import { Container, Grid, Typography, Button, Card, CardContent, CardMedia, Box } from '@mui/material';
import invest5 from '../../Assets/invest5.png'; // Path adjusted based on your folder structure


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
    image: 'https://via.placeholder.com/300x200', // Replace with your image URL if needed
  },
  {
    title: 'Ocean III Suites, III',
    interestRate: '6.8%',
    raised: '642,090',
    required: '1,000,000',
    image: 'https://via.placeholder.com/300x200', // Replace with your image URL if needed
  },
  {
    title: 'Vijaya Akani VI',
    interestRate: '6.3%',
    raised: '642,060',
    required: '1,000,000',
    image: 'https://via.placeholder.com/300x200', // Replace with your image URL if needed
  },
];

// Investment Stats
const stats = {
  avgInterestRate: '10.11%',
  communityCount: '44,091',
  crowdFunded: '₽752,624,213',
  investorsEarned: '₽16,200,771',
};

function App() {
  return (
    <Container maxWidth="lg">
      {/* Introduction Section */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h3" gutterBottom>
          Investments secured by real estate
        </Typography>
        <Typography variant="h6" paragraph>
          Start investing in business loans secured by real estate today!
        </Typography>

        {/* Cards for different types of investment */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Real estate development projects</Typography>
                <Typography variant="body2">
                  Funds are allocated for the development of residential or real estate, from design to construction and improvement of the area.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Business loans secured by real estate</Typography>
                <Typography variant="body2">
                  A business loan is used to raise capital for daily operations, purchase equipment, or finance a project.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Real estate rental projects</Typography>
                <Typography variant="body2">
                  Funding raised in real estate rental projects is allocated to the purchase, development, and renovation of rental properties.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Investment Opportunities Section */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h3" gutterBottom>
          Real estate loans investment opportunities
        </Typography>

        {/* Displaying each investment card */}
        <Grid container spacing={4} justifyContent="center">
          {investments.map((investment, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ borderRadius: 2 }}>
                {/* CardMedia displays the image */}
                <CardMedia component="img" height="200" image={investment.image} alt={investment.title} />
                <CardContent>
                  <Typography variant="h5" gutterBottom>{investment.title}</Typography>
                  <Typography variant="body2" color="text.secondary">Interest rate: {investment.interestRate}</Typography>

                  {/* Showing Raised and Required funds */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2">Raised: {investment.raised}</Typography>
                    <Typography variant="body2">Required: {investment.required}</Typography>
                  </Box>

                  {/* Button to invest */}
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" sx={{ width: '100%' }}>
                      Invest
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" sx={{ width: '100%' }}>
            Load More
          </Button>
        </Box>
      </Box>

      {/* Crowdfunding Info Section */}
      <Box sx={{ textAlign: 'center', py: 6, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom>
          How does real estate crowdfunding work?
        </Typography>
        <Typography variant="h6" paragraph>
          Crowdfunding provides an opportunity for everyone, even in small amounts, to contribute to business projects secured by real estate. 
          As an investor, you, together with tens or even hundreds of other investors, finance the project, in exchange for receiving real estate as a mortgage.
        </Typography>

        {/* Descriptions for different user roles */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>For Business</Typography>
                <Typography variant="body2">
                  The amount raised goes to the project owner, business or real estate developer, and is invested in construction, renovation, property acquisition, or real estate, generating a constant return for you as an investor.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Profiler</Typography>
                <Typography variant="body2">
                  The intermediary who administers the process, ensuring that everything is done legally and efficiently.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>For Investors</Typography>
                <Typography variant="body2">
                  For those looking for a simple and straightforward way to invest, secured by real estate.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Get Funding</Typography>
                <Typography variant="body2">
                  Start a new project, raise funds through crowdfunding, and give others the opportunity to invest in something real.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Stats Section */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h3" gutterBottom>
          Real Estate Crowdfunding Stats
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5">{stats.avgInterestRate}</Typography>
                <Typography variant="body2">Average Interest Rate</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5">{stats.communityCount}</Typography>
                <Typography variant="body2">Community</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5">{stats.crowdFunded}</Typography>
                <Typography variant="body2">Crowd Funded</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5">{stats.investorsEarned}</Typography>
                <Typography variant="body2">Investors Earned</Typography>
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


</Box>

    </Container>
  );
}

export default App;
