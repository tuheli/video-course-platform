import { Client } from 'pg';
import { databaseUrl } from './config';
import { errorName } from './errorNames';
import fs from 'fs';
import path from 'path';

const relativeCaPath = '../eu-north-1-bundle.pem';
const absoluteCaPath = path.join(__dirname, relativeCaPath);

const client = new Client({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(absoluteCaPath).toString(),
  },
});

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
