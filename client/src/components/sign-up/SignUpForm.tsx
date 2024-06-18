import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { TextInput } from './StyledTextInput';
import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import {
  SignupRequestBody,
  useSigninMutation,
  useSignupMutation,
} from '../../features/apiSlice';
import {
  isDataWithMessage,
  isFetchBaseQueryError,
  isObjectWithData,
} from '../../utils/apiUtils';
import { useAppDispatch } from '../../app/hooks';
import { signedIn } from '../../features/meSlice';
import { notified } from '../../features/notificationSlice';
import { Notification } from '../utility/Notification';

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
  const [signup, { isLoading }] = useSignupMutation();
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

    const signupRequestBody: SignupRequestBody = {
      credentialsNotSafe: {
        email: entries.email,
        password: entries.password,
      },
      fullName: entries.fullName,
      receiveInsiderEmails: entries.checkbox,
    };

    try {
      await signup(signupRequestBody).unwrap();

      const signInResponse = await signin({
        credentialsNotSafe: signupRequestBody.credentialsNotSafe,
      }).unwrap();

      const isStayLoggedInChecked = data.get('stay-logged-in-on-this-device');
      const signedInPayload = {
        ...signInResponse,
        staySignedIn: isStayLoggedInChecked === 'on',
      };

      dispatch(signedIn(signedInPayload));
    } catch (error) {
      if (isObjectWithData(error) && isDataWithMessage(error.data)) {
        dispatch(notified({ message: error.data.message, severity: 'info' }));
        return;
      }

      if (isFetchBaseQueryError(error)) {
        dispatch(
          notified({
            message: 'Fetch error occurred. Check internet connection.',
            severity: 'error',
          })
        );
      }
    }
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
    <>
      <Notification />
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
                mt: 1,
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
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                mb: 1,
              }}
            >
              <div>
                <input type="checkbox" name="stay-logged-in-on-this-device" />
              </div>
              <label htmlFor="stay-logged-in-on-this-device">
                Stay logged in on this device
              </label>
            </Box>
            <Button
              disabled={isLoading}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Sign up
              {isLoading && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 8,
                  }}
                >
                  <CircularProgress size={22} />
                </Box>
              )}
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
              to="/login"
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
    </>
  );
};
