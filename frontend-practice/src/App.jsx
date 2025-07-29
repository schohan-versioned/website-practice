// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import './App.css';
import oceanBackground from './assets/ocean.png';

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${oceanBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <Router>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>

        <nav className="nav-bar">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/add" className="nav-button">Add User</Link>
        </nav>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}
