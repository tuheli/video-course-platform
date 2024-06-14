import { Router } from 'express';
import { userExtractor } from '../middleware';
import { UserInDatabaseSafeWithToken } from './signinRouter';

const router = Router();

router.post('/', userExtractor, (req, res, next) => {
  try {
    // NOTE: This should not happen since
    // user extractor was called first.
    // But typescript does not know that.
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
