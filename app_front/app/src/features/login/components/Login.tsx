/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-props-no-spreading */
// import Typography from '@mui/material/Typography';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from 'components/copylight/Copylight';
import CssBaseline from '@mui/material/CssBaseline';
import { FormProvider } from 'react-hook-form';
import FormInput from 'components/form/FormInput';
import { LoadingButton } from '@mui/lab';
import usePostLoginUser from 'features/auth/hooks/use-post-login-user';

const Login = () => {
  const { methods, handleSubmit, onSubmitHandler, onPromise, isLoading } = usePostLoginUser();

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        mobile={false}
        tablet={4}
        laptop={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item mobile={12} tablet={8} laptop={5} component={Paper} elevation={6} square>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={onPromise(handleSubmit(onSubmitHandler))}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormInput
                name="email"
                label="メールアドレス"
                type="email"
                autoComplete="email"
                InputLabelProps={{ shrink: true }}
              />
              <FormInput
                name="password"
                label="パスワード"
                type="password"
                autoComplete="current-password"
                InputLabelProps={{ shrink: true }}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="次回以降の入力を省略"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                loading={isLoading}
                sx={{ mt: 3, mb: 2 }}
              >
                ログイン
              </LoadingButton>
              <Grid container>
                <Grid item mobile>
                  <Link href="http://localhost:3000/login" variant="body2" color="text.secondary">
                    パスワードをお忘れですか？
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="http://localhost:3000/login" variant="body2" color="text.secondary">
                    アカウントを作成しますか？
                  </Link>
                </Grid>
              </Grid>
              <Copyright mt={5} />
            </Box>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
