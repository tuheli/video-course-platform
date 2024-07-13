import { UserInDatabaseSafe } from './src/types';

declare global {
  namespace Express {
    export interface Request {
      authorizationToken?: string;
      user?: UserInDatabaseSafe;
    }
  }
}
