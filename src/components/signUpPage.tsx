import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Copyright from './copyRight.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputFileUpload from './uploadButton.tsx';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const schema = z.object({
  firstName: z.string().min(3, 'First name must be 2 characters long'),
  lastName: z.string().min(3,'Last name must be 2 characters long'),
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type FormInputs = z.infer<typeof schema>;

export default function SignUp() {
  const { register,handleSubmit, formState: { errors }, trigger } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handleBlur = async (field: keyof FormInputs) => {
    await trigger(field);
  };

  const onSubmit = (data: any) => {
    console.log(data); // You can perform further actions with the form data here
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2} sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:2}}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName', { required: true })}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onBlur={() => handleBlur('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName', { required: true })}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onBlur={() => handleBlur('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('email', { required: true })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={!!errors.email}
                  onBlur={() => handleBlur('email')}
                  autoComplete="email"
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('password', { required: true })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onBlur={() => handleBlur('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} md={12} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                <InputFileUpload/>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                >
                Sign Up
                </Button>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}