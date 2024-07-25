import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import 'react-toastify/dist/ReactToastify.css';
import Copyright from '../common/copyRight.tsx';
import { loginUser } from '../../utils/user_service/user_api.ts';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type FormInputs = z.infer<typeof schema>;

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormInputs> = async data => {
    try {
    const response =  await loginUser(data);
    if(response.status==200){
      const token = response["data"]["token"] || null;
      localStorage.setItem('jwtToken', token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      toast.success("Logged In Successfully!");
    }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error("Error registering user:", error);
    }
  };

  const handleBlur = async (field: keyof FormInputs) => {
    await trigger(field);
  };
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
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
            filter: 'blur(1px)',
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
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                onBlur={() => handleBlur('email')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                onBlur={() => handleBlur('password')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
