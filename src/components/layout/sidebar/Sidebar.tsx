import { NavLink, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isAddQuestionRoute = location.pathname === '/task-create/add-question';

  return (
    <Box
      sx={{
        width: isAddQuestionRoute ? 80 : 260,
        height: '100vh',
        borderRight: '1px solid #EAEAEA',
        bgcolor: 'background.paper',
        transition: 'width 0.2s ease',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          height: 72,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Company Logo"
          sx={{ width: isAddQuestionRoute ? 40 : 120, height: 'auto' }}
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
              mx: isAddQuestionRoute ? 0 : 1,
              px: isAddQuestionRoute ? 0 : 1.5,
              borderRadius: 2,
              mb: 0.5,
              justifyContent: isAddQuestionRoute ? 'center' : 'flex-start',
              '&.active': {
                bgcolor: 'action.selected',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
              {menu.icon}
            </ListItemIcon>
            {!isAddQuestionRoute && (
              <ListItemText primary={menu.label} sx={{ ml: 1 }} />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
