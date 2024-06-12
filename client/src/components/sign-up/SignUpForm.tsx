import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { TextInput } from './StyledTextInput';
import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { User, userAdded } from '../../features/usersSlice';
import { signedIn } from '../../features/meSlice';

const minUsernameLength = 4;
const minPasswordLength = 4;

const validateUsername = (username: string) => {
  const isValid = username.length >= minUsernameLength;
  return isValid;
};

const validatePassword = (password: string) => {
  const isValid = password.length >= minPasswordLength;
  return isValid;
};

const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(email);
  return isValid;
};

const parseSignUpFormEntries = (data: FormData): SignUpFormEntries | null => {
  const entries = Object.fromEntries(data.entries());
  const fullName = entries['full-name'];

  if (
    !fullName ||
    typeof fullName !== 'string' ||
    !validateUsername(fullName)
  ) {
    return null;
  }

  const email = entries['email'];

  if (!email || typeof email !== 'string' || !validateEmail(email)) {
    return null;
  }

  const password = entries['password'];

  if (
    !password ||
    typeof password !== 'string' ||
    !validatePassword(password)
  ) {
    return null;
  }

  const checkbox = entries['receive-insider-emails-checkbox'];

  const signUpFormEntries: SignUpFormEntries = {
    fullName,
    email,
    password,
    checkbox: checkbox === 'on',
  };

  return signUpFormEntries;
};

interface SignUpFormEntries {
  fullName: string;
  email: string;
  password: string;
  checkbox: boolean;
}

export const SignUpForm = () => {
  const [forceShowValidator, setForceShowValidation] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const entries = parseSignUpFormEntries(data);

    if (entries === null) {
      setForceShowValidation(true);
      return;
    }

    const newUser: User = {
      credentials: {
        email: entries.email,
        password: entries.password,
      },
      fullName: entries.fullName,
      receiveInsiderEmails: entries.checkbox,
    };

    dispatch(userAdded(newUser));
    dispatch(signedIn(newUser));
  };

  const usernameValidator = {
    validate: validateUsername,
    invalidMessage: `Username must be at least ${minUsernameLength} characters long`,
    forceShowValidator,
  };

  const passwordValidator = {
    validate: validatePassword,
    invalidMessage: `Password must be at least ${minPasswordLength} characters long`,
    forceShowValidator,
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
        maxWidth: 400,
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
          Become a Lorem instructor
        </Typography>
        <Typography>
          Discover a supportive community of online instructors. Get instant
          access to all creation resources.
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
            placeholder="Full name"
            name="full-name"
            validator={usernameValidator}
          />
          <TextInput
            placeholder="Email"
            name="email"
            validator={emailValidator}
          />
          <TextInput
            placeholder="Password"
            name="password"
            validator={passwordValidator}
            type="password"
          />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <div>
              <input type="checkbox" name="receive-insider-emails-checkbox" />
            </div>
            <label htmlFor="receive-marketing-emails-checkbox">
              I want to get the most out of my experience, by receiving emails
              with insider tips, motivation, special updates and promotions
              reserved for instructors.
            </label>
          </Box>
          <Button variant="contained" color="secondary" type="submit">
            Sign up
          </Button>
        </Stack>
        <Typography
          variant="caption"
          sx={{
            textAlign: 'center',
          }}
        >
          By signing up, you agree to our{' '}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              component="span"
              variant="caption"
              sx={{
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                textDecorationThickness: 2,
                textDecorationColor: (theme) =>
                  theme.palette.secondary.extralight,
              }}
            >
              Terms of Use
            </Typography>
          </Link>{' '}
          and{' '}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            {' '}
            <Typography
              component="span"
              variant="caption"
              sx={{
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                textDecorationThickness: 2,
                textDecorationColor: (theme) =>
                  theme.palette.secondary.extralight,
              }}
            >
              Privacy Policy
            </Typography>
          </Link>
          .
        </Typography>
        <Divider />
        <Typography
          sx={{
            textAlign: 'center',
          }}
        >
          Already have an account?{' '}
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
                textDecorationThickness: 2,
                textDecorationColor: (theme) =>
                  theme.palette.secondary.extralight,
              }}
            >
              Log in
            </Typography>
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};
