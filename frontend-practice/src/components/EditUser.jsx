import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import UserForm from './UserForm';
import SnackbarMessage from './SnackbarMessage';

export default function EditUser() {
  const { id } = useParams();
  const [form, setForm] = useState({ salary: '' });
  const [userInfo, setUserInfo] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({ salary: data.salary });
        setUserInfo(data);
      })
      .catch((err) => console.error('Error fetching user:', err));
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/updateuser/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSnackbarOpen(true);
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="body1" mb={2}>
        <strong>Name:</strong> {userInfo.fn} {userInfo.ln} <br />
        <strong>Email:</strong> {userInfo.email} <br />
        <strong>Age:</strong> {userInfo.age}
      </Typography>

      <UserForm
        title="Update Salary"
        formData={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel="Update"
        showFields={{ salary: true }}
      />

      <SnackbarMessage
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Salary updated successfully!"
      />
    </Container>
  );
}
