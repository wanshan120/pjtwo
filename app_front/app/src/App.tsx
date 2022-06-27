import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

import Home from 'components/pages/Home';
import ContentsDetail from 'components/templates/ContentsDetail';
import ResponsiveDrawer from 'components/organisms/SideMenuBar copy';
import ResponsiveMenuBar from 'components/organisms/ResponsiveMenuBar';
import PageDetailMovie from 'components/pages/DetailMovie';

import theme from 'theme/myTheme';

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
          <Route path="contents_detail" element={<ContentsDetail />} />
          <Route path="contents_detail_copy" element={<ResponsiveDrawer />} />
          <Route path="mini_drawer" element={<ResponsiveMenuBar />} />
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
