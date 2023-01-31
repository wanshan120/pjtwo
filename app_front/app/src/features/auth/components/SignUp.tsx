/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-props-no-spreading */

// React
import { FormProvider } from 'react-hook-form';

// MUI
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { LoadingButton } from '@mui/lab';

// My
import FormInput from 'components/form/FormInput';
import Copyright from 'components/copylight/Copylight';
import usePostSignUpUser from 'features/auth/hooks/use-post-sign-up-user';

const SignUp = () => {
  const { methods, handleSubmit, onSubmitHandler, onPromise, isLoading } = usePostSignUpUser();

  return (
    <Container component="main" maxWidth="tablet">
      <CssBaseline />
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ユーザー新規登録
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={onPromise(handleSubmit(onSubmitHandler))}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={0}>
              <Grid item mobile={12}>
                <FormInput name="name" label="ユーザー名" helperText="他のユーザーに公開されます" />
              </Grid>
              <Grid item mobile={12}>
                <FormInput
                  name="email"
                  label="メールアドレス"
                  helperText="他のユーザーに公開されません"
                  type="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item mobile={12}>
                <FormInput
                  name="password"
                  label="パスワード"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item mobile={12}>
                <FormInput name="passwordConfirm" label="パスワード再入力" type="password" />
              </Grid>
              <Grid item mobile={12}>
                <FormControlLabel
                  control={<Checkbox value="agree" color="primary" />}
                  label="利用規約に同意します"
                />
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              loading={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              サインアップ
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3000/login" variant="body2" color="text.secondary">
                  既にアカウントをお持ちですか？ ログイン
                </Link>
              </Grid>
            </Grid>
            <Copyright mt={5} />
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignUp;
