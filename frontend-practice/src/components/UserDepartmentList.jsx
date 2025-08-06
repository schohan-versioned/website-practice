// src/components/UserDepartmentList.jsx
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function UserDepartmentList({ departments, onRemove }) {
  if (!departments || departments.length === 0) {
    return <Typography variant="body2">No departments assigned.</Typography>;
  }

  return (
    <List>
      {departments.map((dept) => (
        <ListItem
          key={dept.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => onRemove(dept.id)}>
              <Delete />
            </IconButton>
          }
        >
          <ListItemText primary={dept.name} />
        </ListItem>
      ))}
    </List>
  );
}
