'use client';

import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

export default function ManagerDashboard() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/getOrders');
      const data = await res.json();

      // Calculate total orders and total revenue
      const revenue = data.reduce((sum, order) => sum + Number(order.total || 0), 0);

      setOrders(data);
      setTotalOrders(data.length);
      setTotalRevenue(revenue);
    };

    fetchOrders();
  }, []);

  return (
    <>
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
          <Divider sx={{ marginY: 2 }} />
          {orders.map((order, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">Order ID: {order._id}</Typography>
              <Typography>Customer: {order.customerEmail}</Typography>
              <Typography>
                Products: {order.items.map((item) => `${item.pname} (x${item.quantity || 1})`).join(', ')}
              </Typography>
              <Typography>Total: €{Number(order.total || 0).toFixed(2)}</Typography> {/* Safeguarded */}
              <Typography>Time: {new Date(order.timestamp).toLocaleString()}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
}
