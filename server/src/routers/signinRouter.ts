import { CredentialsNotSafe, UserInDatabaseSafe } from './signupRouter';
import { Router } from 'express';
import bcypt from 'bcrypt';
import { errorName } from '../errorNames';
import { getUserByEmail, getUserForSignIn } from '../queries/usersQueries';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

interface SignInRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
}

interface UserInDatabaseSafeWithToken extends UserInDatabaseSafe {
  authenticationToken: string;
}

const toSignInRequestBody = (body: unknown): SignInRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('credentialsNotSafe' in body)) {
    const error = new Error('CredentialsNotSafe is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const credentialsNotSafe = body.credentialsNotSafe;

  if (!credentialsNotSafe || typeof credentialsNotSafe !== 'object') {
    const error = new Error('CredentialsNotSafe is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('email' in credentialsNotSafe)) {
    const error = new Error('Email is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !credentialsNotSafe.email ||
    typeof credentialsNotSafe.email !== 'string'
  ) {
    const error = new Error('Email is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('password' in credentialsNotSafe)) {
    const error = new Error('Password is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !credentialsNotSafe.password ||
    typeof credentialsNotSafe.password !== 'string'
  ) {
    const error = new Error('Property password is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const validSignInRequestBody: SignInRequestBody = {
    credentialsNotSafe: {
      email: credentialsNotSafe.email,
      password: credentialsNotSafe.password,
    },
  };

  return validSignInRequestBody;
};

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    if (!jwtSecret) {
      const error = new Error('JWT secret is missing from .env file.');
      error.name = errorName.missingEnvironmentVariable;
      throw error;
    }

    const signInRequestBody = toSignInRequestBody(req.body);
    const userInDatabaseNotSafe = await getUserForSignIn(
      signInRequestBody.credentialsNotSafe.email
    );

    if (!userInDatabaseNotSafe) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const isPasswordCorrect = await bcypt.compare(
      signInRequestBody.credentialsNotSafe.password,
      userInDatabaseNotSafe.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Password is incorrect.' });
    }

    const userInDatabaseSafe: UserInDatabaseSafe = {
      id: userInDatabaseNotSafe.id,
      email: userInDatabaseNotSafe.email,
      fullName: userInDatabaseNotSafe.fullName,
      receiveInsiderEmails: userInDatabaseNotSafe.receiveInsiderEmails,
    };

    const token = jwt.sign(userInDatabaseSafe, jwtSecret);

    const userInDatabaseSafeWithToken: UserInDatabaseSafeWithToken = {
      ...userInDatabaseSafe,
      authenticationToken: token,
    };

    return res.status(200).json(userInDatabaseSafeWithToken);
  } catch (error) {
    next(error);
  }
});

export default router;
