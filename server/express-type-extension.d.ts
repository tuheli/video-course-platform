import { UserInDatabaseSafe } from './src/routers/signupRouter';

declare global {
  namespace Express {
    export interface Request {
      authorizationToken?: string;
      user?: UserInDatabaseSafe;
    }
  }
}
