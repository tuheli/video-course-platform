import { Client } from 'pg';
import { DATABASE_URL } from './config';

const client = new Client(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(
      'Error connecting to database. Is the database running? Error message:',
      error
    );
    process.exit(1);
  }
};

const disconnectFromDatabase = async () => {
  try {
    await client.end();
  } catch (error) {
    console.log('Error disconnecting from database. Error message:', error);
    process.exit(1);
  }
};

export { client, connectToDatabase, disconnectFromDatabase };
