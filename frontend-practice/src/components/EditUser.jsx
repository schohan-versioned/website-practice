// src/components/EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';

export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/user/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setSalary(data.salary);
      })
      .catch(err => console.error('Error fetching user:', err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/updateuser/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ salary }),
    });
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" mb={2} align="center">
          Update Salary
        </Typography>

        <Typography variant="body1" mb={1}>
          <strong>Name:</strong> {user.fn} {user.ln}
        </Typography>
        <Typography variant="body1" mb={1}>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" mb={2}>
          <strong>Age:</strong> {user.age}
        </Typography>

        <Box component="form" onSubmit={handleUpdate}>
          <TextField
            label="New Salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Update
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
