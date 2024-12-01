'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form default behavior

    // Validate passwords
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      console.log('Submitting registration with:', { email, password });

      // Make API call to register the user
      const res = await fetch('/api/newregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('API Response status:', res.status);

      // Check if the response is successful
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // Parse the response JSON
      const data = await res.json();
      console.log('API Response data:', data);

      // Handle success or error in the API response
      if (data.success) {
        setMessage('Registration successful! Please log in.');
      } else {
        setMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
              Register
            </Button>
          </Box>
          {message && (
            <Typography variant="body2" color={message.includes('successful') ? 'primary' : 'error'} sx={{ marginTop: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}
