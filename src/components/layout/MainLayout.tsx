// src/components/layout/MainLayout.tsx

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#F8FAFC',
      }}
    >
      {/* Left Navigation */}
      <Sidebar />

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top Header */}
        <Navbar />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
