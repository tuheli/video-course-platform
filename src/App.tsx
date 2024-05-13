import { useState } from 'react';
import getTheme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { PaletteMode, createTheme } from '@mui/material';
import LandingPage from './components/landing-page/LandingPage';

// NOTE: Import css baseline up top to prevent mui error that somethimes occurs.

const App = () => {
  const [themeMode] = useState<PaletteMode>('light');
  const theme = createTheme(getTheme(themeMode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingPage />
    </ThemeProvider>
  );
};

export default App;
