import { useState } from 'react';
import getTheme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { PaletteMode, createTheme } from '@mui/material';
import { SignedOutRoutes } from './components/routes/SignedOutRoutes';
import { useAppSelector } from './app/hooks';
import { SignedInRoutes } from './components/routes/SignedInRoutes';

// NOTE: Import css baseline high enough to prevent mui error

const App = () => {
  const signedInUser = useAppSelector((state) => state.me.user);
  const [themeMode] = useState<PaletteMode>('light');
  const theme = createTheme(getTheme(themeMode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!signedInUser && <SignedOutRoutes />}
      {signedInUser && <SignedInRoutes />}
    </ThemeProvider>
  );
};

export default App;
