import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DonationRequestForm() {
  const navigate = useNavigate();

  // Compute today's date for the date picker
  const today = new Date().toISOString().split('T')[0];

  // Form state variables
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

  const [expectedAttendees, setExpectedAttendees] = useState('');

  // Changed field: Are there any sponsor benefits for donors? (Yes/No)
  const [areSponsorBenefits, setAreSponsorBenefits] = useState('');
  const [describeBenefits, setDescribeBenefits] = useState('');

  // Error state for validations
  const [errors, setErrors] = useState({});

  // Drop-down options for Sri Lanka provinces
  const sriLankaProvinces = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province'
  ];

  // Options for sponsor benefits dropdown
  const sponsorBenefitsOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  // Validate required fields and phone number length
  const validate = () => {
    const newErrors = {};
    if (!eventName.trim()) newErrors.eventName = 'Event Name is required';
    if (!eventDate.trim()) newErrors.eventDate = 'Event Date is required';
    if (!eventLocation.trim()) newErrors.eventLocation = 'Event Location is required';
    if (!organizationName.trim()) newErrors.organizationName = 'Organization Name is required';
    if (!addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!stateProvince.trim()) newErrors.stateProvince = 'Province is required';
    if (!phoneNo.trim()) {
      newErrors.phoneNo = 'Phone No is required';
    } else if (!/^\d{10}$/.test(phoneNo)) {
      newErrors.phoneNo = 'Phone No must be exactly 10 digits';
    }
    if (!email.trim()) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
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
      expectedAttendees,
      areSponsorBenefits,
      describeBenefits,
    };
    console.log('Donation Request Submitted:', formData);
    // Process formData (e.g., API call) here.
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Donation Request Form
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* TOP SECTION: Event Details */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  error={!!errors.eventName}
                  helperText={errors.eventName}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Event Date"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                  error={!!errors.eventDate}
                  helperText={errors.eventDate}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Event Location"
                  variant="outlined"
                  fullWidth
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  error={!!errors.eventLocation}
                  helperText={errors.eventLocation}
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
                  error={!!errors.organizationName}
                  helperText={errors.organizationName}
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
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1}
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
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  label="Province"
                  variant="outlined"
                  fullWidth
                  value={stateProvince}
                  onChange={(e) => setStateProvince(e.target.value)}
                  error={!!errors.stateProvince}
                  helperText={errors.stateProvince}
                >
                  {sriLankaProvinces.map((prov) => (
                    <MenuItem key={prov} value={prov}>
                      {prov}
                    </MenuItem>
                  ))}
                </TextField>
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
                  type="tel"
                  fullWidth
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
                  error={!!errors.phoneNo}
                  helperText={errors.phoneNo}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
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
                  value={typeOfDonation}
                  onChange={(e) => setTypeOfDonation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Amount/Items Request"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={amountItemsRequest}
                  onChange={(e) => setAmountItemsRequest(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">USD</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Purpose of Donation"
                  variant="outlined"
                  fullWidth
                  value={purposeDonation}
                  onChange={(e) => setPurposeDonation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Beneficiary of Donation"
                  variant="outlined"
                  fullWidth
                  value={beneficiary}
                  onChange={(e) => setBeneficiary(e.target.value)}
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
                  label="Event Date"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                  error={!!errors.eventDate}
                  helperText={errors.eventDate}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Expected Number of Attendees"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={expectedAttendees}
                  onChange={(e) => setExpectedAttendees(e.target.value)}
                  inputProps={{
                    min: 0,
                    onKeyPress: (e) => {
                      if (e.key === '-') e.preventDefault();
                    }
                  }}
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
                  select
                  label="Are there any sponsor benefits for donors?"
                  variant="outlined"
                  fullWidth
                  value={areSponsorBenefits}
                  onChange={(e) => setAreSponsorBenefits(e.target.value)}
                >
                  {[
                    { value: 'Yes', label: 'Yes' },
                    { value: 'No', label: 'No' }
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {areSponsorBenefits === 'Yes' && (
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Describe Sponsorship Benefits"
                    variant="outlined"
                    fullWidth
                    value={describeBenefits}
                    onChange={(e) => setDescribeBenefits(e.target.value)}
                  />
                </Grid>
              )}
            </Grid>
          </Box>

          {/* Back and Submit Buttons */}
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={() => navigate('/community')} sx={{ mr: 1 }}>
              Back
            </Button>
            <Button variant="contained" type="submit">
              Submit &amp; Post
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default DonationRequestForm;