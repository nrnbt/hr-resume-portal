'use client'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useSnackbar } from '@/providers/toaster';
import { useRouter } from 'next/navigation';
import validator from 'validator';
import { FormEvent, FunctionComponent, useEffect, useState } from 'react';
import { useAuthContext } from '@/providers/auth';

interface RegisterFormData {
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string,
  phone: string
}

const RegisterUser: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    phone: ''
  });

  const { showSnackbar } = useSnackbar();
  const { isLoggedIn, loaded } = useAuthContext()
  const router = useRouter();

  useEffect(() => {
    if(loaded && isLoggedIn){
      router.push('/resume')
    }
  },[isLoggedIn, loaded])

  const validateForm = (userData: RegisterFormData) => {
    let isValid = true;
    const newErrors = { ...errors };
    const data = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      confirmPassword: userData.confirmPassword,
      phone: userData.phone
    };
  
    if (!validator.isEmail(data.email || '')) {
      newErrors.email = 'Имэйл хаяг буруу байна';
      isValid = false;
    } else {
      newErrors.email = '';
    }
  
    if (!validator.isLength(data.password || '', { min: 6 })) {
      newErrors.password = 'Нууц үг хамгийн багадаа 6 тэмдэгтээс байх ёстой';
      isValid = false;
    } else {
      newErrors.password = '';
    }
  
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Нууц үг зөв давтагдсан байх ёстой';
      isValid = false;
    } else {
      newErrors.confirmPassword = '';
    }
    if (!/^\d{8}$/.test(data.phone)) {
      newErrors.phone = 'Утасны дугаар буруу байна';
      isValid = false;
    } else {
      newErrors.phone = '';
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData: RegisterFormData = {
      email: data.get('email')?.toString() ?? '',
      password: data.get('password')?.toString() ?? '',
      firstName: data.get('firstName')?.toString() ?? '',
      lastName: data.get('lastName')?.toString() ?? '',
      confirmPassword: data.get('confirmPassword')?.toString() ?? '',
      phone: data.get('phone')?.toString() ?? '',
    };

    if (!validateForm(userData)) {
      return;
    }

    const { confirmPassword, ...userDataToSend } = userData;

    setLoading(true);
    await axios.post('/api/register', userDataToSend)
      .then((res) => {
        if(res.status === 200) {
          showSnackbar('Амжилттай бүртгэгдлээ.', 'success');
          router.push('/login');
        }
      })
      .catch((e) => {
        showSnackbar('Алдаа гарлаа!', 'error');
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='flex justify-center items-center mb-4'>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Бүртгэл үүсгэх
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Овог"
                  autoFocus
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="Нэр"
                  name="firstName"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Имэйл хаяг"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Нууц үг"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Нууц үг давтах"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  autoComplete="phone"
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress className='text-white' size={24} /> : 'Бүртгүүлэх'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login">
                    Бүртгэлтэй бол энд дарж нэвтрэнэ үү.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterUser;
