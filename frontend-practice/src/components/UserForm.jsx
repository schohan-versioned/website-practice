import React from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';

export default function UserForm({
  title,
  formData,
  onChange,
  onSubmit,
  buttonLabel = "Submit",
  showFields = {}
}) {
  return (
    <Paper elevation={4} sx={{ p: 4 }}>
      <Typography variant="h5" mb={3} align="center">
        {title}
      </Typography>

      <Box component="form" onSubmit={onSubmit}>
        {showFields.fn && (
          <TextField
            label="First Name"
            name="fn"
            value={formData.fn}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
        )}

        {showFields.ln && (
          <TextField
            label="Last Name"
            name="ln"
            value={formData.ln}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
        )}

        {showFields.email && (
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
        )}

        {showFields.age && (
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
        )}

        {showFields.salary && (
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
        )}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {buttonLabel}
        </Button>
      </Box>
    </Paper>
  );
}
