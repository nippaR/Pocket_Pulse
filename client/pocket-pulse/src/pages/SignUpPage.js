// src/pages/SignUpPage.js
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
  Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  // Local state for email, passwords, showPasswords
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignUp = () => {
    // Perform your sign-up logic here
    console.log('Signing up with:', email, password, confirm);

    navigate('/');
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
          <Link href="/signin" variant="body2">
            Login
          </Link>
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
