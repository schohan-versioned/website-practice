// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={1} sx={{ mt: 6 }}>
      <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
        <Button component={Link} to="/" variant="outlined" color="primary">
          Home
        </Button>
        <Button component={Link} to="/add" variant="contained" color="primary">
          Add User
        </Button>
      </Toolbar>
    </AppBar>
  );
}
