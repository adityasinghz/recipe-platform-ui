import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Copyright from './copyRight';

const defaultTheme = createTheme();

const schema = z.object({
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  secret_key: z.string().length(6, 'Secret key must be 6 digits'),
});

type FormInputs = z.infer<typeof schema>;

// Mock function to simulate email check in database
const checkEmailInDatabase = async (email: string) => {
  const mockDatabase = ['test@example.com', 'user@example.com', 'email@example.com'];
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(mockDatabase.includes(email));
    }, 1000); // Simulating network delay
  });
};

export default function ForgotPassword() {
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [secretKeyValidated, setSecretKeyValidated] = useState(false);

  const { register, formState: { errors }, trigger, watch, setValue } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handleBlur = async (field: keyof FormInputs) => {
    await trigger(field);
  };

  const handleEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setValue('email', email);
    setIsCheckingEmail(true);

    const exists = await checkEmailInDatabase(email);
    setEmailExists(exists);
    setIsCheckingEmail(false);

    await trigger('email');
  };

  const handleSecretKeyChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const secretKey = event.target.value;
    setValue('secret_key', secretKey);
    await trigger('secret_key');
  };

  const handlePasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setValue('password', password);
    await trigger('password');
  };

  const email = watch('email');
  const secret_key = watch('secret_key');

  const submitEmail = () => {
    if (emailExists) {
      alert('Send key logic goes here');
    } else {
      alert('Email not found in the database');
    }
  };

  const submitKey = () => {
    // Add logic to validate secret key
    setSecretKeyValidated(true);
  };

  const submitPassword = () => {
    if (secretKeyValidated) {
      alert('Password updated successfully');
    } else {
      alert('Secret key validation failed');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email')}
                error={!!errors.email || (emailExists !== null && !emailExists)}
                helperText={
                  errors.email ? errors.email.message :
                  (emailExists !== null && !emailExists && !isCheckingEmail ? 'Email does not exist in the database' : '')
                }
                onBlur={() => handleBlur('email')}
                onChange={handleEmailChange}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                disabled={!email || !!errors.email || isCheckingEmail}
                onClick={submitEmail}
              >
                SEND KEY
              </Button>
              <TextField
                margin="normal"
                required
                fullWidth
                id="secret_key"
                type="number"
                label="Secret key"
                autoComplete="number"
                {...register('secret_key')}
                error={!!errors.secret_key}
                helperText={errors.secret_key ? errors.secret_key.message : ''}
                onBlur={() => handleBlur('secret_key')}
                onChange={handleSecretKeyChange}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!secret_key || !!errors.secret_key}
                onClick={submitKey}
              >
                VALIDATE KEY
              </Button>
              <TextField
                margin="normal"
                required
                fullWidth
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                onBlur={() => handleBlur('password')}
                onChange={handlePasswordChange}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                disabled={!secretKeyValidated || !!errors.password}
                onClick={submitPassword}
              >
                Set Password
              </Button>
              <Copyright sx={{ mt: 3 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
