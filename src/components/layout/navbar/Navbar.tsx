import { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
} from '@mui/material';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { logout } from '../../../store/slices/authSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());

    handleMenuClose();

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar
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
          sx={{
            ml: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Notification */}
          <IconButton
            sx={{
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Badge badgeContent={3} color="info">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>

          {/* Profile */}
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              borderRadius: 1,
              transition: '0.2s',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Avatar
              src={user?.avatar}
              sx={{
                mx: 2,
                borderColor: 'primary.main',
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                {user?.name}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                {user?.role}
              </Typography>
            </Box>

            <KeyboardArrowDownIcon
              sx={{
                fontSize: 18,
                color: 'text.secondary',
              }}
            />
          </Box>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 220,
                },
              },
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{user?.name}</Typography>

              <Typography variant="body2" color="text.secondary">
                {user?.role}
              </Typography>
            </Box>
            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
