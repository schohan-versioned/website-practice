import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import UserForm from './UserForm';
import SnackbarMessage from './SnackbarMessage';
import {
  fetchUserById,
  fetchDepartments,
  fetchUsersInDepartment,
  assignUsersToDepartment,
  updateUser
} from '../utils/api';

export default function EditUser() {
  const { id } = useParams();
  const [form, setForm] = useState({ salary: '' });
  const [userInfo, setUserInfo] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedDeptIds, setSelectedDeptIds] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const user = await fetchUserById(id);
      setUserInfo(user);
      setForm({ salary: user.salary });

      const allDepts = await fetchDepartments();
      setDepartments(allDepts);

      // Load user's departments
      const res = await fetch(`${process.env.REACT_APP_API}/departments`);
      const all = await res.json();
      const deptRes = await fetch(`${process.env.REACT_APP_API}/departments/${id}/users`);
      const deptUsers = await deptRes.json();
      const thisUser = deptUsers.find((u) => u.id.toString() === id.toString());

      if (thisUser && thisUser.departments) {
        const deptNames = thisUser.departments.split(',').map((d) => d.trim());
        const matched = all.filter((d) => deptNames.includes(d.name));
        setSelectedDeptIds(matched.map((d) => d.id));
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateUser(id, form);

    if (selectedDeptIds.length > 0) {
      await assignUsersToDepartment(id, selectedDeptIds);
    }

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
        title="Update Salary and Departments"
        formData={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel="Update"
        showFields={{ salary: true }}
        departments={departments}
        selectedDeptIds={selectedDeptIds}
        setSelectedDeptIds={setSelectedDeptIds}
      />

      <SnackbarMessage
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="User updated successfully!"
      />
    </Container>
  );
}
