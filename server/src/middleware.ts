import { NextFunction, Request, Response } from 'express';
import { jwtSecret } from './config';
import { errorName } from './errorNames';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { getUserById } from './queries/usersQueries';
import { UserInDatabaseSafe } from './types';

interface RequestLogInfo {
  timestamp: string;
  url: string;
  method?: string;
  body?: unknown;
  requestIp?: string;
  clientIpNotReliable?: string | string[];
  user: UserInDatabaseSafe | null;
  authorization?: string;
}

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

export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const replaceSensitiveInformationInBody = (body: unknown) => {
    if (!body || typeof body !== 'object') return body;
    if (
      !('credentialsNotSafe' in body) ||
      !body.credentialsNotSafe ||
      typeof body.credentialsNotSafe !== 'object'
    )
      return body;
    if (
      !('password' in body.credentialsNotSafe) ||
      !body.credentialsNotSafe.password ||
      typeof body.credentialsNotSafe.password !== 'string'
    )
      return body;

    const credentialsNotSafe = {
      ...body.credentialsNotSafe,
      password: '****',
    };

    const nonSensitiveBody = {
      ...body,
      credentialsNotSafe,
    };

    return nonSensitiveBody;
  };

  const getUserFromRequest = async (
    req: Request
  ): Promise<UserInDatabaseSafe | null> => {
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
      if (!req.authorizationToken) return null;

      const decodedToken = jwt.verify(
        req.authorizationToken,
        jwtSecret
      ) as jwt.JwtPayload;
      if (!decodedToken.id) return null;

      const userInDatabaseSafe = await getUserById(decodedToken.id);
      return userInDatabaseSafe;
    } catch (error) {
      return null;
    }
  };

  try {
    const isRequestToApiEndpoint = req.url.startsWith('/api/');
    if (!isRequestToApiEndpoint) return next();

    const timestamp = new Date().toISOString();
    const requestIp = req.ip;
    const clientIpNotReliable = req.get('x-forwarded-for');
    const url = req.url;
    const method = req.method;
    const body = replaceSensitiveInformationInBody(req.body);
    const user = await getUserFromRequest(req);
    const authorization = req.headers.authorization;

    const info: RequestLogInfo = {
      timestamp,
      url,
      method,
      body,
      requestIp,
      clientIpNotReliable,
      user,
      authorization,
    };

    switch (req.method) {
      case 'GET':
        info.method = 'GET';
        break;
      case 'HEAD':
        info.method = 'HEAD';
        break;
      case 'POST':
        info.method = 'POST';
        break;
      case 'PUT':
        info.method = 'PUT';
        break;
      case 'DELETE':
        info.method = 'DELETE';
        break;
      case 'CONNECT':
        info.method = 'CONNECT';
        break;
      case 'OPTIONS':
        info.method = 'OPTIONS';
        break;
      case 'TRACE':
        info.method = 'TRACE';
        break;
      case 'PATCH':
        info.method = 'PATCH';
        break;
    }

    console.log(info);
    return next();
  } catch (error) {
    console.log('error at request logger', error);
    return next(error);
  }
};
