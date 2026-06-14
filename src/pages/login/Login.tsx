import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import frame from '../../assets/frame.png';
import logo from '../../assets/logo.png';
import { useAppDispatch } from '../../hooks';
import { loginApi } from '../../store/api/authApi';
import { setCredentials } from '../../store/slices/authSlice';
import { LoginFormValues, loginSchema } from './model/schema';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

      if (!response?.status) {
        throw new Error('Login failed');
      }

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setCredentials({ token, user: user }));

      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(
        'Invalid credentials. Please try admin/password for demo access.'
      );

      if (error) throw error;
    }
  };

  return (
    <>
      <Grid container>
        <Grid size={6}>
          {/* Left Side */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={frame}
              alt="Login Illustration"
              sx={{ maxHeight: '100vh' }}
            />
          </Box>
        </Grid>

        <Grid
          size={6}
          sx={{ padding: 2, gap: 20, display: 'flex', flexDirection: 'column' }}
        >
          <Card
            elevation={0}
            sx={{
              width: '100%',
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700 }}
                    gutterBottom
                  >
                    Login to Your Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use your company provided Login credentials to access the
                    dashboard.
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
                      sx={{
                        height: 48,
                        borderRadius: 2,
                        textTransform: 'none',
                      }}
                    >
                      Login
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
