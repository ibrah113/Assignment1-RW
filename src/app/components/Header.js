'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push('/')}>
          Krispy Kreme App
        </Typography>
        <Button color="inherit" onClick={() => router.push('/register')}>
          Register
        </Button>
        <Button color="inherit" onClick={() => router.push('/login')}>
          Login
        </Button>
        <Button color="inherit" onClick={() => router.push('/customer')}>
          Customer
        </Button>
        <Button color="inherit" onClick={() => router.push('/manager')}>
          Manager
        </Button>
        <Button color="inherit" onClick={() => router.push('/view_cart')}>
          View Cart
        </Button>
        <Button color="inherit" onClick={() => router.push('/checkout')}>
          Checkout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
