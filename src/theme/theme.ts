import { createTheme } from '@mui/material/styles';

const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0ea5e9',
      light: '#7dd3fc',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    divider: '#cbd5e1',
  },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.15,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.25,
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.4rem',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.2rem',
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.65,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      width: 160,
      height: 48,
    },
  },
  // shape: {
  //   borderRadius: 16,
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f7fb',
          color: '#0f172a',
          minHeight: '100vh',
          fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

export default appTheme;
