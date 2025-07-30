import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function SnackbarMessage({ open, onClose, message, severity = 'success', duration = 3000 }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
