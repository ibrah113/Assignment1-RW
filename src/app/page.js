'use client';

import React from 'react';
import Header from './components/Header';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            Welcome to Krispy Kreme App
          </Typography>
          <Typography variant="h6">
            This application is designed for both customers and managers. Use the navigation bar to explore the features.
          </Typography>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="body1">
              - Customers can register, log in, view products, add items to their cart, and complete purchases.
            </Typography>
            <Typography variant="body1">
              - Managers can log in to view orders, total revenue, and manage statistics.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
