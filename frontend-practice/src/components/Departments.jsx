import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton
} from '@mui/material';

import { Edit, Delete } from '@mui/icons-material';

import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../utils/api';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState('');
  const [editingDeptId, setEditingDeptId] = useState(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const data = await fetchDepartments();
    setDepartments(data);
  };

  const handleCreate = async () => {
    if (!newDeptName.trim()) return;
    await createDepartment(newDeptName.trim());
    setNewDeptName('');
    loadDepartments();
  };

  const handleUpdate = async (id) => {
    if (!editingName.trim()) return;
    await updateDepartment(id, editingName.trim());
    setEditingDeptId(null);
    setEditingName('');
    loadDepartments();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      await deleteDepartment(id);
      loadDepartments();
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 6, px: 2 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Departments
        </Typography>

        {/* Create Department */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 4 }}>
          <TextField
            label="New Department Name"
            value={newDeptName}
            onChange={(e) => setNewDeptName(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </Box>

        {/* Department Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Users</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>{dept.id}</TableCell>

                  <TableCell>
                    {editingDeptId === dept.id ? (
                      <TextField
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        size="small"
                      />
                    ) : (
                      dept.name
                    )}
                  </TableCell>

                  <TableCell>{dept.user_count}</TableCell>

                  <TableCell>
                    {editingDeptId === dept.id ? (
                      <>
                        <Button
                          size="small"
                          onClick={() => handleUpdate(dept.id)}
                          sx={{ mr: 1 }}
                        >
                          Save
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => {
                            setEditingDeptId(null);
                            setEditingName('');
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => {
                            setEditingDeptId(dept.id);
                            setEditingName(dept.name);
                          }}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(dept.id)}
                          size="small"
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Departments;
