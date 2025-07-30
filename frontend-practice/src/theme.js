// src/theme.js
import { createTheme } from '@mui/material/styles';
import { lightBlue, blueGrey } from '@mui/material/colors';

export const getAppTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: lightBlue,
      secondary: blueGrey,
      background: {
        default: mode === 'dark' ? '#0a192f' : '#e3f2fd',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  });
