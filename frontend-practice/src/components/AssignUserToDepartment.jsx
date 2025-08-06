import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

import { fetchDepartments, assignUserToDepartment } from '../utils/api';

export default function AssignUserToDepartment({ userId, onAssigned }) {
  const [departments, setDepartments] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState('');

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (err) {
        console.error('Error loading departments:', err);
      }
    };

    loadDepartments();
  }, []);

  const handleAssign = async () => {
    if (!selectedDeptId) return;
    try {
      await assignUserToDepartment(userId, selectedDeptId);
      setSelectedDeptId('');
      onAssigned(); // Reload the list
    } catch (err) {
      console.error('Error assigning user to department:', err);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Assign User to Department
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
          labelId="department-select-label"
          value={selectedDeptId}
          onChange={(e) => setSelectedDeptId(e.target.value)}
          label="Department"
        >
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.id}>
              {dept.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleAssign}>
        Assign
      </Button>
    </Box>
  );
}
