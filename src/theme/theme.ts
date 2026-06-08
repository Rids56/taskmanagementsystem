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

        '.app-editor': {
          border: '1px solid #fff',
          borderRadius: '4px',
          transition: 'border-color 200ms, box-shadow 200ms',

          '&:hover': {
            borderColor: '#5f77ff',
          },

          '&:focus-within': {
            borderColor: '#2563eb',
            borderWidth: '1px',
            boxShadow: '0 0 0 1px #2563eb',
          },

          '& .ql-toolbar': {
            border: 'none',
            borderBottom: '1px solid',
            borderColor: 'inherit',
            backgroundColor: '#fff',
          },

          '& .ql-toolbar.ql-snow, .ql-container.ql-snow': {
            borderRadius: '4px',
          },

          '& .ql-container': {
            border: 'none',
            fontFamily: 'inherit',
          },

          '& .ql-editor': {
            padding: '16.5px 14px',
            fontSize: '1rem',
            fontFamily: 'inherit',
          },
        },

        '.app-editor-error': {
          border: '1px solid #fff',
          borderColor: '#d32f2f',

          '&:hover': {
            borderColor: '#d32f2f',
          },

          '&:focus-within': {
            borderColor: '#d32f2f',
            boxShadow: '0 0 0 1px #d32f2f',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5f77ff',
          },

          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7389ff',
            borderWidth: 1,
          },

          '&.Mui-focused:not(.Mui-error)': {
            boxShadow: '0 0 0 2px rgba(115, 137, 255, 0.2)',
            borderRadius: 4,
          },

          // '&.Mui-error.Mui-focused': {
          //   boxShadow: '0 0 0 1px rgba(211, 47, 47, 0.15)',
          // },
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
        contained: {
          backgroundColor: '#7389ff',
          '&:hover': {
            backgroundColor: '#5f77ff',
          },
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
