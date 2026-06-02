import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

export default function Navbar() {
  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>

          <Avatar sx={{ mx: 2 }}>A</Avatar>

          <Box>
            <Typography sx={{ fontWeight: 600 }}>Alex Wando</Typography>
            <Typography variant="caption">Admin</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
