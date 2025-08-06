// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getButtonStyle = (path) => ({
    variant: isActive(path) ? 'contained' : 'outlined',
    color: 'primary',
    sx: {
      color: isActive(path) ? 'white' : 'primary.main',
      backgroundColor: isActive(path) ? 'primary.main' : 'transparent',
      borderColor: 'primary.main',
      '&:hover': {
        backgroundColor: 'primary.dark',
        color: 'white',
      },
    },
  });

  return (
    <AppBar position="static" color="transparent" elevation={1} sx={{ mt: 6 }}>
      <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
        <Button component={Link} to="/" {...getButtonStyle('/')}>
          Home
        </Button>
        <Button component={Link} to="/add" {...getButtonStyle('/add')}>
          Add User
        </Button>
        <Button component={Link} to="/departments" {...getButtonStyle('/departments')}>
          Departments
        </Button>
      </Toolbar>
    </AppBar>
  );
}
