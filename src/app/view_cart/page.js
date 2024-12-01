'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await fetch('/api/getCartItems');
      const data = await res.json();

      const total = data.reduce((sum, item) => sum + Number(item.price || 0), 0);

      setCartItems(data);
      setTotalPrice(total);
    };

    fetchCartItems();
  }, []);

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <Container>
          <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 4 }}>
            Your cart is empty.
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Your Cart
          </Typography>
          <Divider />
          <Box sx={{ marginTop: 2 }}>
            {cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 2,
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Typography>{item.pname}</Typography>
                <Typography>€{Number(item.price || 0).toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h5" sx={{ textAlign: 'right' }}>
            Total: €{Number(totalPrice || 0).toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            fullWidth
            onClick={() => (window.location.href = '/checkout')}
          >
            Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
}
