import { Client } from 'pg';
import { databaseUrl } from './config';
import { errorName } from './errorNames';

const client = new Client(databaseUrl);

const connectToDatabase = async () => {
  try {
    await client.connect();
  } catch (error) {
    if (!(error instanceof Error)) {
      const customError = new Error(
        `Unknown error at connectToDatabase. Error object: ${error}`
      );
      customError.name = errorName.unknownError;
      throw customError;
    }

    if (error.name === errorName.missingEnvironmentVariable) {
      throw error;
    }

    const customError = new Error(
      `Error connecting to database. Is the database running? Error message: ${error.message}`
    );
    customError.name = errorName.errorAtDatabase;
    throw customError;
  }
};

const disconnectFromDatabase = async () => {
  try {
    await client.end();
  } catch (error) {
    if (!(error instanceof Error)) {
      const customError = new Error(
        `Unknown error at disconnectFromDatabase. Error object: ${error}`
      );
      customError.name = errorName.unknownError;
      throw customError;
    }

    const customError = new Error(
      `Error disconnecting from database. Error message: ${error.message}`
    );
    customError.name = errorName.errorAtDatabase;
    throw customError;
  }
};

export { client, connectToDatabase, disconnectFromDatabase };
