import { useState } from 'react';
import getTheme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { PaletteMode, createTheme } from '@mui/material';
import LandingPage from './components/landing-page/LandingPage';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/not-found-page/NotFoundPage';
import { TeachWithUsPage } from './components/teach-with-us-page/TeachWithUsPage';

// NOTE: Import css baseline up top to prevent mui error that somethimes occurs

// NOTE: Scrolling to top on initial load prevents visual flickering if window was scrolled down

const App = () => {
  const [themeMode] = useState<PaletteMode>('light');
  const theme = createTheme(getTheme(themeMode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teaching" element={<TeachWithUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
