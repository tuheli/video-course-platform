import { Router } from 'express';
import bcypt from 'bcrypt';
import { client } from '../database';

interface CredentialsNotSafe {
  email: string;
  password: string;
}

interface SignupRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
  fullName: string;
  receiveInsiderEmails: boolean;
}

interface UserInDatabaseNotSafe {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

type UserForDatabase = Omit<UserInDatabaseNotSafe, 'id'>;

interface UserInDatabaseSafe {
  id: string;
  email: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

const toSignupRequestBody = (body: unknown): SignupRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Body is not an object.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (!('credentialsNotSafe' in body)) {
    const error = new Error('Credentials are missing.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  const credentials = body.credentialsNotSafe;

  if (!credentials || typeof credentials !== 'object') {
    const error = new Error('Credentials is not an object.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (!('email' in credentials)) {
    const error = new Error('Email is missing.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (typeof credentials.email !== 'string') {
    const error = new Error('Email is not a string.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (!('password' in credentials)) {
    const error = new Error('Password is missing.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (typeof credentials.password !== 'string') {
    const error = new Error('Password is not a string.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (!('fullName' in body)) {
    const error = new Error('Full name is missing.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (typeof body.fullName !== 'string') {
    const error = new Error('Full name is not a string.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (!('receiveInsiderEmails' in body)) {
    const error = new Error('Receive insider emails is missing.');
    error.name = 'ClientSentInvalidData';
    throw error;
  }

  if (typeof body.receiveInsiderEmails !== 'boolean') {
    const error = new Error('Receive insider emails is not a boolean.');
    error.name = 'ClientSentInvalidData';
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

  console.log(validRequest);

  return validRequest;
};

const createUser = async (
  userForDatabase: UserForDatabase
): Promise<UserInDatabaseSafe> => {
  try {
    const sqlText =
      'INSERT INTO users (email, password_hash, full_name, receive_insider_emails) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, receive_insider_emails';

    const values = [
      userForDatabase.email,
      userForDatabase.passwordHash,
      userForDatabase.fullName,
      userForDatabase.receiveInsiderEmails,
    ];

    const queryResult = await client.query(sqlText, values);

    if (!queryResult || queryResult.rows.length !== 1) {
      const customError = new Error(
        `Failed to create user. Empty query result or row length is not 1.`
      );
      customError.name = 'ErrorAtDatabase';
      throw customError;
    }

    const databaseRow = queryResult.rows[0];

    const userInDatabaseSafe = {
      id: databaseRow.id,
      email: databaseRow.email,
      fullName: databaseRow.full_name,
      receiveInsiderEmails: databaseRow.receive_insider_emails,
    };

    return userInDatabaseSafe;
  } catch (error) {
    if (!(error instanceof Error)) {
      const customError = new Error(
        `Unknown error at createUser. Error object: ${error}`
      );
      customError.name = 'UnknownError';
      throw customError;
    }

    if (error.name === 'ErrorAtDatabase') {
      throw error;
    }

    const customError = new Error(
      `Failed to create user. Error message: ${error.message}`
    );

    customError.name = 'ErrorAtDatabase';
    throw customError;
  }
};

const getUserByEmail = async (
  email: string
): Promise<UserInDatabaseSafe | null> => {
  try {
    const sqlText =
      'SELECT id, email, full_name, receive_insider_emails FROM users WHERE email = $1';

    const values = [email];
    const queryResult = await client.query(sqlText, values);

    if (!queryResult || queryResult.rows.length !== 1) {
      return null;
    }

    const databaseRow = queryResult.rows[0];

    const userInDatabaseSafe = {
      id: databaseRow.id,
      email: databaseRow.email,
      fullName: databaseRow.full_name,
      receiveInsiderEmails: databaseRow.receive_insider_emails,
    };

    return userInDatabaseSafe;
  } catch (error) {
    if (!(error instanceof Error)) {
      const customError = new Error(
        `Unknown error at getUser. Error object: ${error}`
      );
      customError.name = 'UnknownError';
      throw customError;
    }

    const customError = new Error(
      `Failed to get user. Error message: ${error.message}`
    );
    customError.name = 'ErrorAtDatabase';
    throw customError;
  }
};

const router = Router();
const saltRounds = 10;

router.post('/', async (req, res) => {
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
    console.log(error);
  }
});

export default router;
