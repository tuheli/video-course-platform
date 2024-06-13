import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { SignInRequestBody, useSigninMutation } from '../../features/apiSlice';
import { isDataWithMessage, isObjectWithData } from '../../utils/apiUtils';
import { useAppDispatch } from '../../app/hooks';
import { signedIn } from '../../features/meSlice';
import { TextInput } from '../sign-up/StyledTextInput';

interface SignInFormEntries {
  email: string;
  password: string;
}

const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(email);
  return isValid;
};

const parseSignUpFormEntries = (data: FormData): SignInFormEntries | null => {
  const entries = Object.fromEntries(data.entries());

  const email = entries['email'];

  if (!email || typeof email !== 'string' || !validateEmail(email)) {
    return null;
  }

  const password = entries['password'];

  if (!password || typeof password !== 'string') {
    return null;
  }

  const signInFormEntries: SignInFormEntries = {
    email,
    password,
  };

  return signInFormEntries;
};

export const SignInForm = () => {
  const [forceShowValidator, setForceShowValidation] = useState(false);
  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const entries = parseSignUpFormEntries(data);

    if (entries === null) {
      setForceShowValidation(true);
      return;
    }

    const signInRequestBody: SignInRequestBody = {
      credentialsNotSafe: {
        email: entries.email,
        password: entries.password,
      },
    };

    try {
      const signInResponse = await signin({
        credentialsNotSafe: signInRequestBody.credentialsNotSafe,
      }).unwrap();

      dispatch(signedIn(signInResponse));
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
          <TextInput placeholder="Password" name="password" type="password" />
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
              to="/"
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
