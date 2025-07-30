// src/components/AddUser.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';

export default function AddUser() {
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fn, ln, email, age, salary }),
    });
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" mb={3} align="center">
          Add New User
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            value={fn}
            onChange={(e) => setFn(e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Last Name"
            value={ln}
            onChange={(e) => setLn(e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
