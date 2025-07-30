// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from '@mui/material';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/users`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched users:', data);
        setUsers(data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 6, px: 2 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Registered Users
        </Typography>

        {users.length === 0 ? (
          <Typography variant="body1">No users found.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.fn} {user.ln}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>${user.salary}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/edit/${user.id}`}
                        variant="outlined"
                        size="small"
                        color="primary"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
