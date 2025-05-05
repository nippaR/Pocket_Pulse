// src/pages/LoginPage.js
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
  Link,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/records');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
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
        Login
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
        label="Password"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        sx={{ mb: 1 }}
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

      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>

      <Box textAlign="center" sx={{ mb: 2 }}>
        <Typography variant="body2">
          Don’t have an account?{' '}
          <Link component="button" onClick={() => navigate('/signup')} variant="body2">
            Sign Up
          </Link>
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }}>or</Divider>

      <Button
        variant="outlined"
        fullWidth
        sx={{ mb: 2, textTransform: 'none' }}
        startIcon={<FacebookIcon />}
        onClick={() => console.log('Login with Facebook')}
      >
        Login with Facebook
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{ textTransform: 'none' }}
        startIcon={<GoogleIcon />}
        onClick={() => console.log('Login with Google')}
      >
        Login with Google
      </Button>
    </Container>
  );
};

export default LoginPage;
