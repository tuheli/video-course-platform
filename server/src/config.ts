import dotenv from 'dotenv';
import { errorName } from './errorNames';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT;

if (!databaseUrl) {
  const error = new Error(
    'DATABASE_URL is missing from .env file. Define it and restart the server.'
  );
  error.name = errorName.missingEnvironmentVariable;
  throw error;
}

if (!jwtSecret) {
  const error = new Error(
    'JWT_SECRET is missing from .env file. Define it and restart the server.'
  );
  error.name = errorName.missingEnvironmentVariable;
  throw error;
}

if (!port) {
  const error = new Error(
    'PORT is missing from .env file. Define it and restart the server.'
  );
  error.name = errorName.missingEnvironmentVariable;
  throw error;
}

export { databaseUrl, jwtSecret, port };
