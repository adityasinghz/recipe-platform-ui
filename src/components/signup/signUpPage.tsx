import {Avatar,Button,CssBaseline,TextField,Link,Paper,Box, Grid, Typography,MenuItem,InputLabel,FormControl} from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Copyright from '../common/copyRight.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputFileUpload from './uploadButton.tsx';
import { useState,useMemo } from 'react';
import countryList from 'react-select-country-list';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { registerUser } from '../../utils/user_service/user_api.ts';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  firstName: z.string().min(3, 'First name must be 3 characters long'),
  lastName: z.string().min(3,'Last name must be 3 characters long'),
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
    delete data["confirm_password"];
    console.log("data ",data);
    //data["imageUrl"] = selectedImage || '';
    try {
     const response =  await registerUser(data);
     if(response.status==201){
       setTimeout(()=>{navigate("/login");},1000);
       toast.success("Account Has Been Created!");
     }
    } catch (error) {
      toast.error("Account Already Registered!");
      console.error("Error registering user:", error);
    }
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
        {selectedImage ? (
        <Box mt={2}>
         <Avatar src={selectedImage} alt="Uploaded" sx={{ width: 50, height: 50 }}/>
        </Box>
        ) : (
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 50, height: 50 }}>
          <HowToRegIcon />
        </Avatar>
        )}
          
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:2}}>
            <Grid item xs={12} md={12} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                <InputFileUpload 
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />
              </Grid>
              <Grid item xs={12} sm={12}></Grid>
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
  );
}

/*

{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "$2a$10$/T7bVznNjzbcgMpdjsfxvuONT.C9mDh8qdZ8Ay5P6j2QKy/JB3TbC",
    "confirmPassword": "$2a$10$Ge9x.oj6ewrvi5vYHpk/tuMuAZPqiHp5vshtDEfi2/pIZObcqbxXy",
    "country": "United States",
    "region": "California",
    "imageUrl": "http://example.com/profile-picture.jpg"
}



*/