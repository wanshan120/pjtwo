import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// URL pattern list
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { ToastContainer, Slide } from 'react-toastify';
import { urlPatterns } from 'urlPatterns';

// MUI
import theme from 'theme/myTheme';

// compornents
import RichLayout from 'components/layout/RichLayout';
import HomePage from 'features/home/components/HomePage';
import MyList from 'features/mylist/components/MyList';
import PageDetailMovieBoundary from 'features/movie/routes/DetailPage';
import LoginPage from 'features/login/routes/LoginPage';
import SignUpPage from 'features/auth/routes/SignUpPage';
import VerifyEmailPage from 'features/auth/routes/VerifyEmailPage';
import RequireUser from 'features/auth/components/RequireUser';
import UnauthorizePage from 'features/auth/components/Unauthorized';
import Skelton from 'features/skelton/components/Skelton';
// toast
import 'react-toastify/dist/ReactToastify.css';
import 'theme/toast.css';

const App: FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          theme="dark"
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
        <Routes>
          <Route path="*" element={<Navigate to={urlPatterns.home.path} replace />} />

          <Route element={<RichLayout />}>
            <Route path={urlPatterns.home.path} element={<HomePage />} />
            <Route
              path={`${urlPatterns.detailMovie.path}/:movieId`}
              element={<PageDetailMovieBoundary />}
            />
            <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
              <Route path={urlPatterns.myList.path} element={<MyList />} />
              <Route path={urlPatterns.watchlist.path} element={<MyList />} />
              <Route path={urlPatterns.notice.path} element={<HomePage />} />
              <Route path={urlPatterns.message.path} element={<Skelton />} />
            </Route>
            <Route path="unauthorized" element={<UnauthorizePage />} />
          </Route>

          <Route path={urlPatterns.login.path} element={<LoginPage />} />
          <Route path={urlPatterns.signUp.path} element={<SignUpPage />} />
          <Route
            path={`${urlPatterns.verifyEmail.path}/:verificationCode`}
            element={<VerifyEmailPage />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
