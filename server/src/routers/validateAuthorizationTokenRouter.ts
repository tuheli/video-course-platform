import { Router } from 'express';
import { userExtractor } from '../middleware';
import { UserInDatabaseSafeWithToken } from '../types';

const router = Router();

router.post('/', userExtractor, (req, res, next) => {
  try {
    if (!req.user || !req.authorizationToken) {
      return res
        .status(401)
        .json({ message: 'Authorization token is invalid. Please sign in.' });
    }

    const userInDatabaseSafeWithToken: UserInDatabaseSafeWithToken = {
      ...req.user,
      authorizationToken: req.authorizationToken,
    };

    return res.status(200).json(userInDatabaseSafeWithToken);
  } catch (error) {
    next(error);
  }
});

export default router;
