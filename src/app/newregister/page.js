'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        let email = data.get('email');
        let pass = data.get('pass');
        let confirmPass = data.get('confirmPass');
        let address = data.get('address');
        let number = data.get('number');
        
        if (pass !== confirmPass) {
          alert('Passwords do not match');
          return;
        }
      
        console.log("Sent email:", email);
        console.log("Sent pass:", pass);
        console.log("Address:", address);
        console.log("Telephone Number:", number);
      
        runDBCallAsync(`/api/newregister?email=${email}&pass=${pass}`);
      };
      
      async function runDBCallAsync(url) {



        const res = await fetch(url);
        const data = await res.json()
         



      }

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Password"
            type="password"
            id="pass"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPass"
            label="Confirm Password"
            type="password"
            id="confirmPass"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="number"
            label="Telephone Number"
            type="tel"
            id="number"
            autoComplete="tel"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            id="address"
            autoComplete="street-address"
          />
        
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
