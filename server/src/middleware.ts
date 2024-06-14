import { NextFunction, Request, Response } from 'express';
import { jwtSecret } from './config';
import { errorName } from './errorNames';
import jwt from 'jsonwebtoken';
import { getUserById } from './queries/usersQueries';

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
      return res.status(401).json({ message: 'User was not found.' });
    }

    req.user = userInDatabaseSafe;
    next();
  } catch (error) {
    next(error);
  }
};
