import { Router } from 'express';
import bcypt from 'bcrypt';
import { errorName } from '../errorNames';
import { createUser } from '../queries/usersQueries';
import { getUserByEmail } from '../queries/usersQueries';

export interface CredentialsNotSafe {
  email: string;
  password: string;
}

interface SignupRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface UserInDatabaseNotSafe {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export type UserForDatabase = Omit<UserInDatabaseNotSafe, 'id'>;

export interface UserInDatabaseSafe {
  id: string;
  email: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

const toSignupRequestBody = (body: unknown): SignupRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('credentialsNotSafe' in body)) {
    const error = new Error('Credentials are missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const credentials = body.credentialsNotSafe;

  if (!credentials || typeof credentials !== 'object') {
    const error = new Error('Credentials is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('email' in credentials)) {
    const error = new Error('Email is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (typeof credentials.email !== 'string') {
    const error = new Error('Email is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('password' in credentials)) {
    const error = new Error('Password is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (typeof credentials.password !== 'string') {
    const error = new Error('Password is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('fullName' in body)) {
    const error = new Error('Full name is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (typeof body.fullName !== 'string') {
    const error = new Error('Full name is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('receiveInsiderEmails' in body)) {
    const error = new Error('Receive insider emails is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (typeof body.receiveInsiderEmails !== 'boolean') {
    const error = new Error('Receive insider emails is not a boolean.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const validRequest = {
    credentialsNotSafe: {
      email: credentials.email,
      password: credentials.password,
    },
    fullName: body.fullName,
    receiveInsiderEmails: body.receiveInsiderEmails,
  };

  return validRequest;
};

const router = Router();
const saltRounds = 10;

router.post('/', async (req, res, next) => {
  try {
    const requestBody = toSignupRequestBody(req.body);
    const existingUser = await getUserByEmail(
      requestBody.credentialsNotSafe.email
    );

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const passwordHash = await bcypt.hash(
      requestBody.credentialsNotSafe.password,
      saltRounds
    );

    const userForDatabase = {
      email: requestBody.credentialsNotSafe.email,
      passwordHash,
      fullName: requestBody.fullName,
      receiveInsiderEmails: requestBody.receiveInsiderEmails,
    };

    const userInDatabaseSafe = await createUser(userForDatabase);
    return res.status(201).json(userInDatabaseSafe);
  } catch (error) {
    next(error);
  }
});

export default router;
