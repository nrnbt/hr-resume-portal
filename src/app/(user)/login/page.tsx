'use client'

import { useAuthContext } from '@/providers/auth';
import { useSnackbar } from '@/providers/toaster';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useState, FormEvent, useEffect } from 'react';

const LoginPage: FunctionComponent = () => {
  const [loading, setLoading] = useState(false)

  const { showSnackbar } = useSnackbar();
  const router = useRouter()
  const { login, user, isLoggedIn } = useAuthContext()

  const handleLogin = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    setLoading(true);
    await axios.post('/api/login', userData)
      .then((res) => {
        if(res.status === 200) {
          showSnackbar('Амжилттай нэвтэрлээ.', 'success');
          login(res.data.token)
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

  useEffect(( ) => {
    if (isLoggedIn && user !== undefined && user !== null){
      router.replace("/");
    }
  },[user, isLoggedIn])

  return (
    <div className='flex h-full justify-center items-center'>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(login-bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid className='flex h-full items-center' item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Бүртгэлээр нэвтрэх
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Имэйл хаяг"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Нууц үг"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress style={{ color: 'white' }} size={24} /> : 'Нэвтрэх'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forget-password">
                    {/* Нууц үг сэргээх */}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" >
                    {"Бүртгүүлэх"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage