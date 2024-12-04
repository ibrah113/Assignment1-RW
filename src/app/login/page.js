'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import validator from 'email-validator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const validateForm = () => {
    let errorMessage = '';

    // Validate email
    if (!validator.validate(email)) {
      errorMessage += 'Invalid email address.\n';
    }

    // Validate password
    if (!password || password.length < 6) {
      errorMessage += 'Password must be at least 6 characters long.';
    }

    return errorMessage;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    const errorMessage = validateForm();

    if (errorMessage.length > 0) {
      setMessage(errorMessage);
      setOpen(true);
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('Login successful!');
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('isLoggedIn', true);

        if (data.role === 'manager') {
          window.location.href = '/manager';
        } else if (data.role === 'customer') {
          window.location.href = '/customer';
        }
      } else {
        setMessage(data.message || 'Invalid email or password. Please try again.');
        setOpen(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An unexpected error occurred. Please try again.');
      setOpen(true);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Login
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
            <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
              Login
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </>
  );
}
