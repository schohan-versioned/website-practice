import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import Navbar from './components/Navbar';
import oceanBackground from './assets/ocean.png';

import { ThemeProvider, CssBaseline, Button, Box } from '@mui/material';
import { getAppTheme } from './theme';

export default function App() {
  const [themeMode, setThemeMode] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={getAppTheme(themeMode)}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${oceanBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Router>
          <Button
            onClick={toggleTheme}
            sx={{
              position: 'fixed',
              top: '1rem',
              right: '1rem',
              zIndex: 1000,
              backgroundColor: 'background.paper',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'divider',
              fontWeight: 600,
              px: 2,
              py: 1,
              borderRadius: 1,
              boxShadow: 2,
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
          >
            {themeMode === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
          </Button>

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}
