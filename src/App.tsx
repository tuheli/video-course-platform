import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import LandingPage from './components/landing-page/LandingPage';
import getTheme from './theme';
import { useState } from 'react';

const App = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode>('light');
  const theme = createTheme(getTheme(themeMode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingPage />
    </ThemeProvider>
  );
};

export default App;
