import { Router } from 'express';
import bcypt from 'bcrypt';
import { createUser } from '../queries/usersQueries';
import { getUserByEmail } from '../queries/usersQueries';
import { toSignupRequestBody } from '../type-guards-and-parsers';

const router = Router();
const saltRounds = 10;

router.post('/', async (req, res, next) => {
  try {
    const requestBody = toSignupRequestBody(req.body);
    const existingUser = await getUserByEmail(
      requestBody.credentialsNotSafe.email
    );

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const passwordHash = await bcypt.hash(
      requestBody.credentialsNotSafe.password,
      saltRounds
    );

    const userForDatabase = {
      email: requestBody.credentialsNotSafe.email,
      passwordHash,
      fullName: requestBody.fullName,
      receiveInsiderEmails: requestBody.receiveInsiderEmails,
    };

    const userInDatabaseSafe = await createUser(userForDatabase);
    return res.status(201).json(userInDatabaseSafe);
  } catch (error) {
    next(error);
  }
});

export default router;
