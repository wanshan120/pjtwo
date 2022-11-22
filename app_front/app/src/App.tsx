import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// URL pattern list
import { urlPatterns } from 'urlPatterns';

// MUI
import theme from 'theme/myTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

// compornents
import HomePage from 'features/home/components/HomePage';
import MyList from 'features/mylist/components/MyList';
import PageDetailMovieBoundary from 'features/movie/routes/DetailPage';

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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@:300,400,500,700&display=swap"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path={urlPatterns.home.path} element={<HomePage />} />
          <Route path={urlPatterns.myList.path} element={<MyList />} />
          <Route path={urlPatterns.watchlist.path} element={<MyList />} />
          <Route path={urlPatterns.notice.path} element={<HomePage />} />
          <Route path={urlPatterns.message.path} element={<HomePage />} />
          <Route path={urlPatterns.detailMovie.path} element={<PageDetailMovieBoundary />}>
            <Route path=":movieId" element={<PageDetailMovieBoundary />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
