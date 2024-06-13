import { Box, Container } from '@mui/material';
import { SignUpForm } from './SignUpForm';
import { Notification } from '../notification/Notification';

export const SignUpSection = () => {
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
          <SignUpForm />
        </Box>
      </Container>
    </>
  );
};
