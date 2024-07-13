import { UserInDatabaseSafe } from '../types';
import { Router } from 'express';
import bcypt from 'bcrypt';
import { errorName } from '../errorNames';
import { getUserForSignIn } from '../queries/usersQueries';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import { UserInDatabaseSafeWithToken } from '../types';
import { toSignInRequestBody } from '../type-guards-and-parsers';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    if (!jwtSecret) {
      const error = new Error('JWT secret is missing from .env file.');
      error.name = errorName.missingEnvironmentVariable;
      throw error;
    }

    const signInRequestBody = toSignInRequestBody(req.body);
    const userInDatabaseNotSafe = await getUserForSignIn(
      signInRequestBody.credentialsNotSafe.email
    );

    if (!userInDatabaseNotSafe) {
      return res.status(400).json({ message: 'Email is not in use.' });
    }

    const isPasswordCorrect = await bcypt.compare(
      signInRequestBody.credentialsNotSafe.password,
      userInDatabaseNotSafe.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Password is incorrect.' });
    }

    const userInDatabaseSafe: UserInDatabaseSafe = {
      id: userInDatabaseNotSafe.id,
      email: userInDatabaseNotSafe.email,
      fullName: userInDatabaseNotSafe.fullName,
      receiveInsiderEmails: userInDatabaseNotSafe.receiveInsiderEmails,
    };

    const token = jwt.sign(userInDatabaseSafe, jwtSecret);

    const userInDatabaseSafeWithToken: UserInDatabaseSafeWithToken = {
      ...userInDatabaseSafe,
      authorizationToken: token,
    };

    return res.status(200).json(userInDatabaseSafeWithToken);
  } catch (error) {
    next(error);
  }
});

export default router;
