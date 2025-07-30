// src/components/InputField.jsx
import { TextField } from '@mui/material';

export default function InputField({ type, placeholder, value, onChange }) {
  return (
    <TextField
      type={type}
      label={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      required
      margin="normal"
    />
  );
}
