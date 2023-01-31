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
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { LoadingButton } from '@mui/lab';

// My
import FormInput from 'components/form/FormInput';
import Copyright from 'components/copylight/Copylight';
import useGetVerifyEmail from 'features/auth/hooks/use-get-verify-email';

const VerifyEmail = () => {
  const { methods, handleSubmit, onSubmitHandler, onPromise, isLoading } = useGetVerifyEmail();

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
          メールアドレス認証
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={onPromise(handleSubmit(onSubmitHandler))}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={0} width="100%">
              <Grid item mobile={12}>
                <FormInput name="verificationCode" label="認証コード" />
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
              送信
            </LoadingButton>
            <Copyright mt={5} />
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
