import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import AnimatedPage from '../common/AnimatedPage.tsx';
import { sentOTP, verifyOTP, registerUser } from '../../utils/user_service/user_api.ts';


const schema = z.object({
  secret_key: z.string().length(6, 'Secret key must be 6 digits'),
});

type FormInputs = z.infer<typeof schema>;

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  useEffect(() => {
    const justRegistered = sessionStorage.getItem('justRegistered');
    if (!justRegistered) navigate('/'); // Redirect if not accessing via registration flow
  }, [navigate]);

  const handleResend = async () => {
    setResendDisabled(true);
    setTimeLeft(60);
    const response =  await sentOTP(userData);
    if(response.status==200){
    toast.success("OTP Sent");
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second
  }
  };

  const onSubmit: SubmitHandler<FormInputs> = async otp => {
    
    console.log("userData ", userData, " otp ",otp);
    try {
      const response = await verifyOTP(otp,userData);
      if (response.status === 200) {await registerUser(userData);}
      setTimeout(() => {
        navigate("/login");
        sessionStorage.removeItem('justRegistered');
        localStorage.removeItem('userData');
      }, 1000);
      toast.success("Verification Completed!");
    } catch (error) {
      toast.error("Invalid OTP");
      console.error("Error registering user:", error);
    }
  };

  const handleBlur = async (field: keyof FormInputs) => {
    await trigger(field);
  };

  const theme = useTheme();
  return (
    <AnimatedPage>
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
              Enter OTP
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="OTP"
                type="number"
                id="otp"
                {...register('secret_key')}
                error={!!errors.secret_key}
                helperText={errors.secret_key ? errors.secret_key.message : ''}
                onBlur={() => handleBlur('secret_key')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                disabled={!isValid}
              >
                Validate OTP
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                disabled={resendDisabled}
                onClick={handleResend}
              >
                {resendDisabled ? `Resend in ${timeLeft}s` : 'Resend'}
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </AnimatedPage>
    
  );
}
