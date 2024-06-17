import { Box, Container } from '@mui/material';
import { SignUpForm } from './SignUpForm';

export const SignUpSection = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SignUpForm />
        </Box>
      </Container>
    </>
  );
};
