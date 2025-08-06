// src/components/UserDepartmentForm.jsx
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchDepartments,
  assignUserToDepartment,
  getUserDepartments,
  removeUserFromDepartment,
} from '../utils/api';

const UserDepartmentForm = ({ userId }) => {
  const [departments, setDepartments] = useState([]);
  const [userDepts, setUserDepts] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState('');

  useEffect(() => {
    loadDepartments();
    loadUserDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await fetchDepartments();
      setDepartments(data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  const loadUserDepartments = async () => {
    try {
      const data = await getUserDepartments(userId);
      setUserDepts(data);
    } catch (err) {
      console.error('Error fetching user departments:', err);
    }
  };

  const handleAssign = async () => {
    if (!selectedDeptId) return;
    await assignUserToDepartment(userId, selectedDeptId);
    setSelectedDeptId('');
    loadUserDepartments();
  };

  const handleRemove = async (deptId) => {
    await removeUserFromDepartment(userId, deptId);
    loadUserDepartments();
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Manage Departments
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Department</InputLabel>
        <Select
          value={selectedDeptId}
          onChange={(e) => setSelectedDeptId(e.target.value)}
          label="Select Department"
        >
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.id}>
              {dept.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mb={2}>
        <Typography>
          <strong>Assigned Departments:</strong>
        </Typography>
        <List>
          {userDepts.map((dept) => (
            <ListItem
              key={dept.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemove(dept.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={dept.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default UserDepartmentForm;
