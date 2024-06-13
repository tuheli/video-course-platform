import { Box, Container } from '@mui/material';
import { SignInForm } from './SignInForm';

export const SignInSection = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <SignInForm />
      </Box>
    </Container>
  );
};
