import { Box, Container } from '@mui/material';
import { SignInForm } from './SignInForm';
import { Notification } from '../notification/Notification';

export const SignInSection = () => {
  return (
    <>
      <Notification />
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
    </>
  );
};
