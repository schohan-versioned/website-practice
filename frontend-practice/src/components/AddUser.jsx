import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import UserForm from './UserForm';
import SnackbarMessage from './SnackbarMessage';

export default function AddUser() {
  const [form, setForm] = useState({ fn: '', ln: '', email: '', age: '', salary: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSnackbarOpen(true);
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <UserForm
        title="Add New User"
        formData={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel="Create"
        showFields={{ fn: true, ln: true, email: true, age: true, salary: true }}
      />
      <SnackbarMessage
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="User successfully added!"
      />
    </Container>
  );
}
