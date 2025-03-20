import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DonationRequestForm() {
  const navigate = useNavigate();

  // State variables for the form fields
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const [organizationName, setOrganizationName] = useState('');
  const [missionStatement, setMissionStatement] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [taxID, setTaxID] = useState('');

  const [typeOfDonation, setTypeOfDonation] = useState('');
  const [amountItemsRequest, setAmountItemsRequest] = useState('');
  const [purposeDonation, setPurposeDonation] = useState('');
  const [beneficiary, setBeneficiary] = useState('');

  const [eventDateTime, setEventDateTime] = useState('');
  const [expectedAttendees, setExpectedAttendees] = useState('');

  const [sponsorshipBenefits, setSponsorshipBenefits] = useState('');
  const [describeBenefits, setDescribeBenefits] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      eventName,
      eventDate,
      eventLocation,
      organizationName,
      missionStatement,
      addressLine1,
      addressLine2,
      city,
      stateProvince,
      zipCode,
      phoneNo,
      email,
      website,
      taxID,
      typeOfDonation,
      amountItemsRequest,
      purposeDonation,
      beneficiary,
      eventDateTime,
      expectedAttendees,
      sponsorshipBenefits,
      describeBenefits,
    };

    console.log('Donation Request Submitted:', formData);

    // You can add your API call or further processing here.
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Donation Request Form
        </Typography>

        {/* TOP SECTION: Event Name, Event Date, Event Location */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Event Name"
                variant="outlined"
                fullWidth
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Event Date"
                variant="outlined"
                fullWidth
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Event Location"
                variant="outlined"
                fullWidth
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Organization Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
            Organization Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Organization Name"
                variant="outlined"
                fullWidth
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Organization's Mission Statement"
                variant="outlined"
                fullWidth
                value={missionStatement}
                onChange={(e) => setMissionStatement(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address Line 1"
                variant="outlined"
                fullWidth
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address Line 2"
                variant="outlined"
                fullWidth
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="State/Province"
                variant="outlined"
                fullWidth
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Zip/Postal Code"
                variant="outlined"
                fullWidth
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Phone No"
                variant="outlined"
                fullWidth
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Website"
                variant="outlined"
                fullWidth
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Tax ID# (if applicable)"
                variant="outlined"
                fullWidth
                value={taxID}
                onChange={(e) => setTaxID(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Request Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
            Request Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Type of Donation Request"
                variant="outlined"
                fullWidth
                value={/* insert state here if needed */ ''}
                onChange={() => {}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Amount/Items Request"
                variant="outlined"
                fullWidth
                value={/* insert state here if needed */ ''}
                onChange={() => {}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Purpose of Donation"
                variant="outlined"
                fullWidth
                value={/* insert state here if needed */ ''}
                onChange={() => {}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Beneficiary of Donation"
                variant="outlined"
                fullWidth
                value={/* insert state here if needed */ ''}
                onChange={() => {}}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Event Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
            Event Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Event Date & Time"
                variant="outlined"
                fullWidth
                value={/* insert state here if needed */ ''}
                onChange={() => {}}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Expected Number of Attendees"
                variant="outlined"
                fullWidth
                value={/* insert state here if needed */ ''}
                onChange={() => {}}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Other Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
            Other Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Sponsorship Benefits for Donors"
                variant="outlined"
                fullWidth
                value={/* insert state here if needed */ ''}
                onChange={() => {}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Describe Sponsorship Benefits"
                variant="outlined"
                fullWidth
                value={/* insert state here if needed */ ''}
                onChange={() => {}}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Back and Submit Buttons */}
        <Box sx={{ textAlign: 'right' }}>
          <Button variant="outlined" onClick={() => navigate('/community')} sx={{ mr: 1 }}>
            Back
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit &amp; Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default DonationRequestForm;