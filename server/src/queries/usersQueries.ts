import { client } from '../database';
import { UserForDatabase, UserInDatabaseSafe } from '../routers/signupRouter';
import { errorName } from '../errorNames';

export const createUser = async (
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

    return userInDatabaseSafe;
  } catch (error) {
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
        `Unknown error at getUser. Error object: ${error}`
      );
      unknownError.name = errorName.unknownError;
      throw unknownError;
    }

    const customError = new Error(
      `Failed to get user. Error message: ${error.message}`
    );
    customError.name = errorName.errorAtDatabase;
    throw customError;
  }
};
