'use client';

import React from 'react';
import Header from './components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            Welcome to Krispy Kreme App
          </Typography>
          <Typography variant="h6">
            Use the navigation bar to access features for customers and managers.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </>
  );
}
