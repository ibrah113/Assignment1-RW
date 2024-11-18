'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function Customer() {
  const [products, setProducts] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('/api/getProducts')
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch('/api/getWeather')
      .then((res) => res.json())
      .then((data) => setWeather(data.temp));
  }, []);

  const addToCart = async (productName) => {
    try {
      const response = await fetch(`/api/putInCart?pname=${productName}`, {
        method: 'GET',
      });
      if (response.ok) {
        alert(`${productName} added to cart successfully!`);
      } else {
        alert(`Failed to add ${productName} to cart.`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!products.length) return <Typography>Loading products...</Typography>;
  if (!weather) return <Typography>Loading weather...</Typography>;

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Typography variant="h4">Customer Page</Typography>
          <Typography variant="h6">Current Temperature: {weather}°C</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', marginTop: 3 }}>
          {products.map((product, index) => (
            <Card key={index} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={product.pname}
                height="140"
                image={product.image || 'https://via.placeholder.com/150'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.pname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description || 'No description available.'}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                  €{Number(product.price || 0).toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onClick={() => addToCart(product.pname)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}
