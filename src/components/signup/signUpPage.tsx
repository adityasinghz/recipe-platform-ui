import {Avatar,Button,CssBaseline,TextField,Link,Paper,Box, Grid, Typography,MenuItem,InputLabel,FormControl} from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Copyright from '../common/copyRight.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState,useMemo } from 'react';
import countryList from 'react-select-country-list';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedPage from '../common/AnimatedPage.tsx';
import { sentOTP } from '../../utils/user_service/user_api.ts';

const schema = z.object({
  firstName: z.string().min(3, 'First name must be 3 characters long'),
  lastName: z.string().min(3,'Last name must be 3 characters long'),
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Passwords do not match',
});
;

type FormInputs = z.infer<typeof schema>;

export default function SignUp() {
  const { register,handleSubmit, formState: { errors, isValid }, trigger } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const [country, setCountry] = useState<string>("India");
  const options = useMemo(() => countryList().getData(), []);
  const handleBlur = async (field: keyof FormInputs) => {
    await trigger(field);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };
  const onSubmit = async (data: any) => {
    data["country"] = country;
    localStorage.setItem('userData', JSON.stringify(data));
    sessionStorage.setItem('justRegistered', 'true');
    toast.warn("OTP Is On The Way!");
    try {
    const response =  await sentOTP(data);
    if(response.status==200){
    setTimeout(()=>{navigate('/verification');},1000);
    toast.success("OTP Has Been Sent!");
    }
    } catch (error) {
      toast.error("Account Already Registered!");
      console.error("Error registering user:", error);
    }
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
            transition: 'background-image 0.3s ease-in-out',
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 50, height: 50,fontSize:'large' }}>
       <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{justifyContent:'center', alignItems:'center', padding:2}}>
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
                  data-testid="email-address"
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
                  data-testid="password-field"
                  onBlur={() => handleBlur('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="label">Country</InputLabel>
                   <Select
                      labelId="country"
                      id="country"
                      value={country||''}
                      label="Country"
                      onChange={handleChange}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('confirm_password', { required: true })}
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  data-testid="confirm-password-field"
                  type="password"
                  id="confirm_password"
                  onBlur={() => handleBlur('confirm_password')}
                  error={!!errors.confirm_password}
                  helperText={errors.confirm_password?.message}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isValid}
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
    </AnimatedPage>
  );
}