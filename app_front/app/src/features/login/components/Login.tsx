/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
// import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

import { UserLogin, userLogin } from 'models/user-login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';

// import usePostJwt from '../hooks/use-post-jwt';
import { useMutation, useQuery } from '@tanstack/react-query';
import postJwt from '../api/post-jwt';

const Login: FC = () => {
  // API Get Current Logged-in user
  const query = useQuery(['authUser'], getMeFn, {
    enabled: false,
    select: (data) => data.data.user,
    retry: 1,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });
  //  API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: UserLogin) =>
      postJwt({
        json: {
          userData,
        },
      }),
    {
      onSuccess: () => {
        query.refetch();
        toast.success('You successfully logged in');
        navigate(from);
      },
      onError: (error: any) => {
        if (Array.isArray(error.response.data.error)) {
          error.response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            }),
          );
        } else {
          toast.error(error.response.data.message, {
            position: 'top-right',
          });
        }
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(userLogin),
  });

  const onSubmitHandler: SubmitHandler<UserLogin> = (values) => {
    // ? Executing the loginUser Mutation
    loginUser(values);
  };

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
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 1 }}>
            <ErrorMessage
              errors={errors}
              name="singleErrorInput"
              render={({ message }) => <span>{message}</span>}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              autoComplete="email"
              autoFocus
              {...register('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="次回以降の入力を省略"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              ログイン
            </Button>
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
