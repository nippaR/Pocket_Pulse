// client/src/pages/SignUpPage.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../services/api';

const SignUpPage = () => {
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // error banner
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');

    // simple client-side match check
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // call your backend signup endpoint
      await api.post('/auth/signup', { email, password });
      // on success, redirect to sign in
      navigate('/signin');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 8,
        boxShadow: 2,
        p: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Create password"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Confirm password"
        variant="outlined"
        type={showConfirm ? 'text' : 'password'}
        fullWidth
        sx={{ mb: 2 }}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => setShowConfirm(!showConfirm)}
                edge="end"
              >
                {showConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>

      <Box textAlign="center" sx={{ mb: 2 }}>
        <Typography variant="body2">
          Already have an account?{' '}
          <RouterLink to="/signin" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Login
          </RouterLink>
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }}>or</Divider>

      <Button
        variant="outlined"
        fullWidth
        sx={{ mb: 2, textTransform: 'none' }}
        startIcon={<FacebookIcon />}
        onClick={() => console.log('Sign up with Facebook')}
      >
        Sign Up with Facebook
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{ textTransform: 'none' }}
        startIcon={<GoogleIcon />}
        onClick={() => console.log('Sign up with Google')}
      >
        Sign Up with Google
      </Button>
    </Container>
  );
};

export default SignUpPage;
