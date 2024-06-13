import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { CredentialsNotSafe, useSigninMutation } from '../../features/apiSlice';
import { isDataWithMessage, isObjectWithData } from '../../utils/apiUtils';
import { useAppDispatch } from '../../app/hooks';
import { signedIn } from '../../features/meSlice';
import { TextInput } from '../sign-up/StyledTextInput';

const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(email);
  return isValid;
};

const validatePassword = (password: string) => {
  const isValid = password.length > 0;
  return isValid;
};

export const toCredentialsNotSafe = (
  data: unknown
): CredentialsNotSafe | null => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (!('email' in data)) {
    return null;
  }

  if (
    !data.email ||
    typeof data.email !== 'string' ||
    !validateEmail(data.email)
  ) {
    return null;
  }

  if (!('password' in data)) {
    return null;
  }

  if (!data.password || typeof data.password !== 'string') {
    return null;
  }

  const credentialsNotSafe = {
    email: data.email,
    password: data.password,
  };

  return credentialsNotSafe;
};

export const SignInForm = () => {
  const [forceShowValidator, setForceShowValidation] = useState(false);
  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formEntries = Object.fromEntries(data.entries());

    const credentialsNotSafe = toCredentialsNotSafe(formEntries);

    if (credentialsNotSafe === null) {
      setForceShowValidation(true);
      return;
    }

    try {
      const signInResponse = await signin({
        credentialsNotSafe,
      }).unwrap();

      const isStayLoggedInChecked = data.get('stay-logged-in-on-this-device');
      const signedInPayload = {
        ...signInResponse,
        staySignedIn: isStayLoggedInChecked === 'on',
      };

      dispatch(signedIn(signedInPayload));
    } catch (error) {
      if (!isObjectWithData(error)) return;
      if (!isDataWithMessage(error.data)) return;
      console.log(error.data.message);
    }
  };

  const emailValidator = {
    validate: validateEmail,
    invalidMessage: 'Invalid email address',
    forceShowValidator,
  };

  const passwordValidator = {
    validate: validatePassword,
    invalidMessage: 'Please enter a password',
    forceShowValidator,
  };

  return (
    <Paper
      sx={{
        position: 'relative',
        width: 400,
        p: 2,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          Login to your Lorem account
        </Typography>
        <Stack
          component="form"
          noValidate
          sx={{
            flexDirection: 'column',
            gap: 1,
          }}
          onSubmit={onSubmit}
        >
          <TextInput
            placeholder="Email"
            name="email"
            validator={emailValidator}
          />
          <TextInput
            placeholder="Password"
            name="password"
            type="password"
            validator={passwordValidator}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              my: 1,
            }}
          >
            <div>
              <input type="checkbox" name="stay-logged-in-on-this-device" />
            </div>
            <label htmlFor="stay-logged-in-on-this-device">
              Stay logged in on this device
            </label>
          </Box>
          <Button variant="contained" color="secondary" type="submit">
            Log in
          </Button>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
          }}
        >
          or{' '}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={{
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                textDecorationColor: 'secondary.dark',
                color: 'secondary.dark',
                fontWeight: 600,
              }}
            >
              Forgot password
            </Typography>
          </Link>{' '}
        </Typography>
        <Divider />
        <Stack>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
            }}
          >
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                textDecoration: 'none',
              }}
            >
              {' '}
              <Typography
                component="span"
                sx={{
                  color: 'secondary.dark',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  textDecorationColor: 'secondary.dark',
                }}
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            {' '}
            <Typography
              variant="body2"
              component="span"
              sx={{
                color: 'secondary.dark',
                fontWeight: 600,
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                textDecorationColor: 'secondary.dark',
              }}
            >
              Log in with your organization
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
};
