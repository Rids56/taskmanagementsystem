import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default AppThemeProvider;
