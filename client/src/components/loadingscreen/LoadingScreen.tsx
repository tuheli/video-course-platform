import { Box, CircularProgress, Container } from '@mui/material';
import { CompanyLogo } from '../appbar/CompanyLogo';

export const LoadingScreen = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: 3,
        }}
      >
        <CompanyLogo />
        <CircularProgress />
      </Box>
    </Container>
  );
};
