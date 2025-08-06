import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

import {
  fetchUsers,
  fetchDepartments,
  searchUsers,
  fetchUsersByDepartment,
  deleteUser
} from '../utils/api';
import SnackbarMessage from './SnackbarMessage';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    loadUsers();
    loadDepartments();
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers();
    console.log('Fetched users:', data);
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error('Expected an array from /users, got:', data);
      setUsers([]);
    }
  };

  const loadDepartments = async () => {
    const data = await fetchDepartments();
    if (Array.isArray(data)) {
      setDepartments(data);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadUsers();
      return;
    }
    const data = await searchUsers(searchQuery.trim());
    if (Array.isArray(data)) {
      setUsers(data);
    }
  };

  const handleFilter = async (e) => {
    const deptId = e.target.value;
    setSelectedDept(deptId);
    if (!deptId) {
      loadUsers();
    } else {
      const data = await fetchUsersByDepartment(deptId);
      if (Array.isArray(data)) {
        setUsers(data);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      setSnackbar({ open: true, message: 'User deleted', severity: 'success' });
      loadUsers();
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 6, px: 2 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Registered Users
        </Typography>

        {/* Search + Filter */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Search by name or email"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <TextField
            select
            label="Filter by Department"
            value={selectedDept}
            onChange={handleFilter}
            fullWidth
          >
            <MenuItem value="">All Departments</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {/* User Table */}
        {Array.isArray(users) && users.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Departments</TableCell>
                  <TableCell>Actions</TableCell>
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
                    <TableCell>{user.departments || user.department_name || '—'}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/edit/${user.id}`}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        size="small"
                        color="error"
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography mt={2}>No users found.</Typography>
        )}
      </Paper>

      <SnackbarMessage
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
}
