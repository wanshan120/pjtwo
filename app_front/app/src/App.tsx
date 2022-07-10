import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// MUI
import theme from 'theme/myTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

// compornents
import Home from 'components/pages/Home';
import HomePage from 'components/pages/HomePage';

import PageDetailMovie from 'components/pages/DetailMovie';
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
          <Route path="home" element={<HomePage />} />
          <Route path="characters" element={<Characters />}>
            <Route path="" element={<AllCharacters />} />
            <Route path=":schoolCode" element={<SchoolCharacters />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="detail_movie" element={<PageDetailMovie />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
