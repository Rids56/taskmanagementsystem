import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useAppSelector } from '../../../hooks';

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>

          <Avatar sx={{ mx: 2 }}>{user?.name?.charAt(0)}</Avatar>

          <Box>
            <Typography sx={{ fontWeight: 600 }}>{user?.name}</Typography>
            <Typography variant="caption">{user?.role}</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
