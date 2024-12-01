'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('isLoggedIn', true);

        setMessage('Login successful!');
        if (data.role === 'manager') {
          router.push('/manager');
        } else {
          router.push('/customer');
        }
      } else {
        setMessage(data.message || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An unexpected error occurred. Please try again.');
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
          {message && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}
