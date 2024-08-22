import dotenv from 'dotenv';
import { errorName } from './errorNames';
dotenv.config();

export const databaseUrl = process.env.DATABASE_URL;
export const jwtSecret = process.env.JWT_SECRET;
export const port = process.env.PORT;
export const awsS3bucketName = process.env.AWS_S3_BUCKET_NAME;
export const awsS3bucketRegion = process.env.AWS_S3_BUCKET_REGION;
export const awsS3AccessKey = process.env.AWS_S3_ACCESS_KEY;
export const awsS3SecretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

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

if (!awsS3bucketName) {
  const error = new Error(
    'BUCKET_NAME is missing from .env file. Define it and restart the server.'
  );
  error.name = errorName.missingEnvironmentVariable;
  throw error;
}

if (!awsS3bucketRegion) {
  const error = new Error(
    'BUCKET_REGION is missing from .env file. Define it and restart the server.'
  );
  error.name = errorName.missingEnvironmentVariable;
  throw error;
}

if (!awsS3AccessKey) {
  const error = new Error(
    'AWS_S3_ACCESS_KEY is missing from .env file. Define it and restart the server.'
  );
  error.name = errorName.missingEnvironmentVariable;
  throw error;
}

if (!awsS3SecretAccessKey) {
  const error = new Error(
    'AWS_S3_SECRET_ACCESS_KEY is missing from .env file. Define it and restart the server.'
  );
  error.name = errorName.missingEnvironmentVariable;
  throw error;
}
