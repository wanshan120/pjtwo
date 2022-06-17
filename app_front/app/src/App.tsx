import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';

import Home from 'components/pages/Home';
import ContentsDetail from 'components/templates/ContentsDetail';

import Characters from 'components/pages/Characters';
import AllCharacters from 'containers/templates/AllCharacters';
import SchoolCharacters from 'containers/templates/SchoolCharacters';
import './App.css';

const App: FC = () => {
  const { hash, pathname } = useLocation();
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contents_detail" element={<ContentsDetail />} />
        <Route path="characters" element={<Characters />}>
          <Route path="" element={<AllCharacters />} />
          <Route path=":schoolCode" element={<SchoolCharacters />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
