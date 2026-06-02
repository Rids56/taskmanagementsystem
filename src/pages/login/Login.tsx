import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  TextField,
  Typography,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch } from '../../hooks';
import logo from '../../assets/logo.png';
import frame from '../../assets/frame.png';
import { LoginFormValues, loginSchema } from './model/schema';
import { loginApi } from '../features/auth/authApi';
import { setCredentials } from '../features/auth/authSlice';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);

    try {
      const response = await loginApi(data);

      if (!response?.success) {
        throw new Error('Login failed');
      }

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      dispatch(setCredentials({ token, user }));

      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(
        'Invalid credentials. Please try admin/password for demo access.'
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: isSmall ? 'column' : 'row',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          bgcolor: 'background.default',
        }}
      >
        <Box
          component="img"
          src={frame}
          alt="Login Illustration"
          sx={{ width: '100%', maxWidth: 540 }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 520,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            bgcolor: 'background.paper',
          }}
        >
          <CardContent sx={{ p: 5, pt: 4 }}>
            <Stack spacing={4}>
              <Box
                component="img"
                src={logo}
                alt="Company Logo"
                sx={{ width: 130, height: 'auto', mx: 'auto' }}
              />

              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
                  Login to Your Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Use your company provided Login credentials to access the dashboard.
                </Typography>
              </Box>

              {errorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
              ) : null}

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="User ID"
                    placeholder="Enter User ID"
                    size="small"
                    error={!!errors.userId}
                    helperText={errors.userId?.message}
                    {...register('userId')}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    placeholder="Enter Password"
                    type="password"
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register('password')}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Link href="#" underline="hover" sx={{ fontSize: 12 }}>
                      Forgot password?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ height: 48, borderRadius: 2, textTransform: 'none' }}
                  >
                    Login
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
