import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import afflogo from '../assets/afflogo.png'; // Import your logo

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!usernameOrEmail) {
      newErrors.usernameOrEmail = 'Please enter a username or email.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      const data = await response.json();

      if (response.ok) {
        onLogin(data.token);
        navigate('/quote-builder');
      } else {
        setErrors({ email: '', password: data.message || 'Login failed.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ email: '', password: 'An error occurred. Please try again.' });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: 2,
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={afflogo}
        alt="Aff Travel Logo"
        sx={{
          width: 200,
          marginBottom: 3, // Space between logo and form
        }}
      />

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: 27 }}>
          Sign in
        </Typography>

        <TextField
          label="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.usernameOrEmail}
          helperText={errors.usernameOrEmail}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          sx={{ marginBottom: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#25327B',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#1B255F', // Slightly darker version of the button color
            },
          }}
        >
          Sign in
        </Button>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
