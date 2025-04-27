import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  InputAdornment,
  Snackbar
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function EditDonationRequestPage() {
  const navigate = useNavigate();
  const { Id } = useParams(); // Ensure route param name matches your route ("/edit-donation-request/:Id")
  const postId = Number(Id);

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
  const [areSponsorBenefits, setAreSponsorBenefits] = useState('');
  const [describeBenefits, setDescribeBenefits] = useState('');

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // For date picker minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  // Provinces dropdown (example for Sri Lanka)
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

  // Load donation request post data on component mount
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    const donationPost = posts.find(
      (post) => post.isDonationRequest && post.id === postId
    );

    if (donationPost && donationPost.formData) {
      const fd = donationPost.formData;
      setEventName(fd.eventName || '');
      setEventDate(fd.eventDate || '');
      setEventLocation(fd.eventLocation || '');
      setOrganizationName(fd.organizationName || '');
      setMissionStatement(fd.missionStatement || '');
      setAddressLine1(fd.addressLine1 || '');
      setAddressLine2(fd.addressLine2 || '');
      setCity(fd.city || '');
      setStateProvince(fd.stateProvince || '');
      setZipCode(fd.zipCode || '');
      setPhoneNo(fd.phoneNo || '');
      setEmail(fd.email || '');
      setWebsite(fd.website || '');
      setTaxID(fd.taxID || '');
      setTypeOfDonation(fd.typeOfDonation || '');
      setAmountItemsRequest(fd.amountItemsRequest || '');
      setPurposeDonation(fd.purposeDonation || '');
      setBeneficiary(fd.beneficiary || '');
      setExpectedAttendees(fd.expectedAttendees || '');
      setAreSponsorBenefits(fd.areSponsorBenefits || '');
      setDescribeBenefits(fd.describeBenefits || '');
    } else {
      alert('Donation request not found.');
      navigate('/community');
    }
  }, [postId, navigate]);

  // Validate form fields based on requirements
  const validate = () => {
    const newErrors = {};

    // Event Date must be in the future (greater than today)
    if (!eventDate.trim()) {
      newErrors.eventDate = 'Event Date is required';
    } else if (new Date(eventDate) <= new Date(today)) {
      newErrors.eventDate = 'Event Date must be a future date';
    }

    if (!eventName.trim()) newErrors.eventName = 'Event Name is required';
    if (!eventLocation.trim()) newErrors.eventLocation = 'Event Location is required';
    if (!organizationName.trim()) newErrors.organizationName = 'Organization Name is required';
    if (!addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!stateProvince.trim()) newErrors.stateProvince = 'Province is required';

    // Zip/Postal Code: exactly 5 digits
    if (zipCode.trim() && !/^\d{5}$/.test(zipCode)) {
      newErrors.zipCode = 'Zip/Postal Code must be exactly 5 digits';
    }

    // Phone No: must start with 0 and be exactly 10 digits, only numeric allowed
    if (!phoneNo.trim()) {
      newErrors.phoneNo = 'Phone No is required';
    } else if (!/^0\d{9}$/.test(phoneNo)) {
      newErrors.phoneNo = 'Phone No must start with 0 and be 10 digits';
    }

    // Email: basic email regex validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Amount/Items Request: must be a number and cannot be negative
    if (amountItemsRequest !== '') {
      const amount = Number(amountItemsRequest);
      if (isNaN(amount)) {
        newErrors.amountItemsRequest = 'Amount/Items Request must be a number';
      } else if (amount < 0) {
        newErrors.amountItemsRequest = 'Amount/Items Request cannot be negative';
      }
    }

    // Expected Number of Attendees: must be a number and cannot be negative
    if (expectedAttendees !== '') {
      const attendees = Number(expectedAttendees);
      if (isNaN(attendees)) {
        newErrors.expectedAttendees = 'Expected Attendees must be a number';
      } else if (attendees < 0) {
        newErrors.expectedAttendees = 'Expected Attendees cannot be negative';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission to update donation request
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedFormData = {
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
      describeBenefits
    };

    // Retrieve posts from localStorage
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && post.isDonationRequest) {
        return { ...post, formData: updatedFormData, timestamp: Date.now() };
      }
      return post;
    });

    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));

    // Show success message using Snackbar
    setOpenSnackbar(true);

    // After a short delay, navigate to the Community page
    setTimeout(() => {
      navigate('/community');
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Edit Donation Request Form
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
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                  inputProps={{ maxLength: 5, pattern: "[0-9]*" }}
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
                  inputProps={{
                    maxLength: 10,
                    pattern: "\\d*",
                    onKeyPress: (e) => {
                      // Allow only numbers
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }
                  }}
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
                    min: 0,
                    onKeyPress: (e) => {
                      // Prevent entering the minus sign
                      if (e.key === '-') e.preventDefault();
                    }
                  }}
                  error={!!errors.amountItemsRequest}
                  helperText={errors.amountItemsRequest}
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
                  error={!!errors.expectedAttendees}
                  helperText={errors.expectedAttendees}
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

          {/* Sponsor Benefits */}
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
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        message="Donation request updated successfully!"
      />
    </Container>
  );
}

export default EditDonationRequestPage;