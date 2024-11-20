/* global grecaptcha */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import afflogo from '../assets/afflogo.png';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Register({ onUserRegistered }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', username: '', password: '', firstName: '', lastName: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', username: '', password: '', firstName: '', lastName: '' };

    if (!firstName) {
      newErrors.firstName = 'First name is required.';
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required.';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!username) {
      newErrors.username = 'Username is required.';
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
      const token = await window.grecaptcha.execute('6Lc-UYUqAAAAAM8Z9YbMUsvXrMEum9Zw69Hcp-Hj', { action: 'register' });

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, username, password, recaptchaToken: token }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationMessage('Registration successful! Redirecting to login...');
        onUserRegistered();
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setRegistrationMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationMessage('An error occurred. Please try again.');
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
      <Box component="img" src={afflogo} alt="Aff Travel Logo" sx={{ width: 200, marginBottom: 3 }} />
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
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth margin="normal" error={!!errors.firstName} helperText={errors.firstName} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth margin="normal" error={!!errors.lastName} helperText={errors.lastName} />
          </Grid>
        </Grid>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" error={!!errors.email} helperText={errors.email} />
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" error={!!errors.username} helperText={errors.username} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" error={!!errors.password} helperText={errors.password} />
        <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#25327B', color: '#FFFFFF', '&:hover': { backgroundColor: '#1B255F' }, marginTop: 2 }}>
          Register
        </Button>
        {registrationMessage && (
          <Typography variant="body2" align="center" sx={{ color: registrationMessage.includes('successful') ? 'green' : 'red', marginTop: 2 }}>
            {registrationMessage}
          </Typography>
        )}
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Login here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;
