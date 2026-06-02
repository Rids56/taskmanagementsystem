import { NavLink } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import logo from '@/assets/logo.png';

const menus = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    label: 'Task Creation',
    icon: <AssignmentIcon />,
    path: '/task-create',
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        borderRight: '1px solid #EAEAEA',
        bgcolor: 'background.paper',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          height: 72,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          px: 3,
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Company Logo"
          sx={{ width: 120, height: 'auto', mx: 'auto' }}
        />
      </Box>

      {/* Menu Section */}
      <List sx={{ pt: 2 }}>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.path}
            component={NavLink}
            to={menu.path}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 0.5,
              '&.active': {
                bgcolor: 'action.selected',
              },
            }}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
