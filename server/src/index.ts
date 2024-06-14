import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectToDatabase } from './database';
import { port } from './config';
import { errorName } from './errorNames';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import signupRouter from './routers/signupRouter';
import signinRouter from './routers/signinRouter';
import courseDraftsRouter from './routers/courseDraftsRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/coursedrafts', courseDraftsRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Token expired.' });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token malformed.' });
  }

  if (!(error instanceof Error)) {
    console.log(
      'Error at errorhandler is not an instance of error. Error object:',
      error
    );
    return res.status(500).json({ message: 'Something went wrong.' });
  }

  switch (error.name) {
    case errorName.errorMessageForClient:
      return res.status(400).json({ message: error.message });
    case errorName.errorAtDatabase:
      console.log('Database error:', error);
      break;
    case errorName.missingEnvironmentVariable:
      console.log('Missing environment variable:', error);
      break;
    case errorName.clientSentInvalidData:
      console.log('Client sent invalid data:', error);
      break;
    case errorName.unknownError:
      console.log('Unknown error:', error);
      break;
    default:
      console.log('Unhandled error:', error);
      break;
  }

  return res.status(500).json({ message: 'Something went wrong.' });
});

// NOTE: Dont catch potential errors
// here. Let a potentially unhandled error
// shut down the process intentionally.
// It could be a configuration error at
// connect to database.

const start = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
