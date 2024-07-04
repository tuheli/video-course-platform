import { NextFunction, Request, Response } from 'express';
import { jwtSecret } from './config';
import { errorName } from './errorNames';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { getUserById } from './queries/usersQueries';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const userExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!jwtSecret) {
      const error = new Error(
        'Configuration missing jwt secret from .env file.'
      );
      error.name = errorName.missingEnvironmentVariable;
      throw error;
    }

    const authorization = req.get('Authorization');

    if (authorization && authorization.startsWith('Bearer ')) {
      req.authorizationToken = authorization.replace('Bearer ', '');
    }

    if (!req.authorizationToken) {
      return res
        .status(401)
        .json({ message: 'Authorization token is missing. Please sign in.' });
    }

    const decodedToken = jwt.verify(req.authorizationToken, jwtSecret, {
      maxAge: '24h',
    }) as jwt.JwtPayload;

    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: 'Authorization token is invalid. Please sign in' });
    }

    const userInDatabaseSafe = await getUserById(decodedToken.id);

    if (!userInDatabaseSafe) {
      return res
        .status(401)
        .json({ message: 'User was not found. Please sign in.' });
    }

    req.user = userInDatabaseSafe;
    next();
  } catch (error) {
    next(error);
  }
};
