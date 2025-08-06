import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import UserForm from './UserForm';
import SnackbarMessage from './SnackbarMessage';
import { fetchDepartments, assignUsersToDepartment } from '../utils/api';

export default function AddUser() {
  const [form, setForm] = useState({ fn: '', ln: '', email: '', age: '', salary: '' });
  const [departments, setDepartments] = useState([]);
  const [selectedDeptIds, setSelectedDeptIds] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await fetchDepartments();
      setDepartments(data);
    };
    loadDepartments();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newUser = await res.json();

    if (selectedDeptIds.length > 0) {
      await assignUsersToDepartment(newUser.id, selectedDeptIds);
    }

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
        departments={departments}
        selectedDeptIds={selectedDeptIds}
        setSelectedDeptIds={setSelectedDeptIds}
      />
      <SnackbarMessage
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="User successfully added!"
      />
    </Container>
  );
}
