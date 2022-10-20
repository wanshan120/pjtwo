import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// URL pattern list
import { urlPatterns } from 'components/const_list/urlPatterns';

// MUI
import theme from 'theme/myTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

// compornents
import Home from 'components/pages/Home';
import HomePage from 'components/pages/HomePage';
import MyList from 'components/pages/MyList';
import DetailMovieBoundary from 'components/pages/DetailMovieBoundary';
import Characters from 'components/pages/Characters';
import AllCharacters from 'containers/templates/AllCharacters';
import SchoolCharacters from 'containers/templates/SchoolCharacters';

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
          <Route path="/" element={<Home />} />
          <Route path={urlPatterns.home.path} element={<HomePage />} />
          <Route path={urlPatterns.myList.path} element={<MyList />} />
          <Route path={urlPatterns.watchlist.path} element={<MyList />} />
          <Route path={urlPatterns.notice.path} element={<HomePage />} />
          <Route path={urlPatterns.message.path} element={<HomePage />} />
          <Route path="characters" element={<Characters />}>
            <Route path="" element={<AllCharacters />} />
            <Route path=":schoolCode" element={<SchoolCharacters />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path={urlPatterns.detailMovie.path} element={<DetailMovieBoundary />}>
            <Route path=":movieId" element={<DetailMovieBoundary />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
