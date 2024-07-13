import { client } from '../database';
import {
  UserForDatabase,
  UserInDatabaseNotSafe,
  UserInDatabaseSafe,
} from '../types';
import { errorName } from '../errorNames';

export const createUser = async (
  userForDatabase: UserForDatabase
): Promise<UserInDatabaseSafe> => {
  try {
    await client.query('BEGIN;');

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
      customError.name = errorName.errorAtDatabase;
      throw customError;
    }

    const databaseRow = queryResult.rows[0];

    const userInDatabaseSafe = {
      id: databaseRow.id,
      email: databaseRow.email,
      fullName: databaseRow.full_name,
      receiveInsiderEmails: databaseRow.receive_insider_emails,
    };

    await client.query('COMMIT;');

    return userInDatabaseSafe;
  } catch (error) {
    await client.query('ROLLBACK;');

    if (!(error instanceof Error)) {
      const unknownError = new Error(
        `Unknown error at createUser. Error object: ${error}`
      );
      unknownError.name = errorName.unknownError;
      throw unknownError;
    }

    if (error.name === errorName.errorAtDatabase) {
      throw error;
    }

    const customError = new Error(
      `Failed to create user. Error message: ${error.message}`
    );
    customError.name = errorName.errorAtDatabase;
    throw customError;
  }
};

export const getUserByEmail = async (
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
      const unknownError = new Error(
        `Unknown error at getUserByEmail. Error object: ${error}`
      );
      unknownError.name = errorName.unknownError;
      throw unknownError;
    }

    const customError = new Error(
      `Failed to get user by email. Error message: ${error.message}`
    );
    customError.name = errorName.errorAtDatabase;
    throw customError;
  }
};

export const getUserById = async (
  id: number | string
): Promise<UserInDatabaseSafe | null> => {
  try {
    const sqlText =
      'SELECT id, email, full_name, receive_insider_emails FROM users WHERE id = $1';

    const values = [id];
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
      const unknownError = new Error(
        `Unknown error at getUserById. Error object: ${error}`
      );
      unknownError.name = errorName.unknownError;
      throw unknownError;
    }

    const customError = new Error(
      `Failed to get user by id. Error message: ${error.message}`
    );
    customError.name = errorName.errorAtDatabase;
    throw customError;
  }
};

export const getUserForSignIn = async (
  email: string
): Promise<UserInDatabaseNotSafe | null> => {
  try {
    const sqlText =
      'SELECT id, email, full_name, receive_insider_emails, password_hash FROM users WHERE email = $1';

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
      passwordHash: databaseRow.password_hash,
      receiveInsiderEmails: databaseRow.receive_insider_emails,
    };

    return userInDatabaseSafe;
  } catch (error) {
    if (!(error instanceof Error)) {
      const unknownError = new Error(
        `Unknown error at getUserForSignIn. Error object: ${error}`
      );
      unknownError.name = errorName.unknownError;
      throw unknownError;
    }

    const customError = new Error(
      `Error at getUserForSignIn. Error message: ${error.message}`
    );
    customError.name = errorName.errorAtDatabase;
    throw customError;
  }
};
