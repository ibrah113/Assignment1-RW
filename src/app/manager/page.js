'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function ManagerDashboard() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || userRole !== 'manager') {
      alert('Access denied. Only managers can view this page.');
      router.push('/login');
    }

    const fetchOrders = async () => {
      const res = await fetch('/api/getOrders');
      const data = await res.json();

      const revenue = data.reduce((sum, order) => sum + Number(order.total || 0), 0);

      setOrders(data);
      setTotalOrders(data.length);
      setTotalRevenue(revenue);
    };

    fetchOrders();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Manager Dashboard
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Typography variant="h6">Total Orders: {totalOrders}</Typography>
            <Typography variant="h6">Total Revenue: €{Number(totalRevenue || 0).toFixed(2)}</Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Divider sx={{ marginY: 2 }} />
          {orders.map((order, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">Order ID: {order._id}</Typography>
              <Typography>Customer: {order.customerEmail}</Typography>
              <Typography>
                Products: {order.items.map((item) => `${item.pname} (x${item.quantity || 1})`).join(', ')}
              </Typography>
              <Typography>Total: €{Number(order.total || 0).toFixed(2)}</Typography>
              <Typography>Time: {new Date(order.timestamp).toLocaleString()}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
}
