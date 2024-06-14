import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewCourseDraftEntry } from './courseDraftsSlice';
import { RootState } from '../app/store';

export interface CredentialsNotSafe {
  email: string;
  password: string;
}

export interface SignupRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface SignInRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
}

interface CreateCourseDraftRequestBody {
  newCourseDraftEntry: NewCourseDraftEntry;
}

interface UserInDatabaseSafe {
  id: number;
  email: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface UserInDatabaseSafeWithToken extends UserInDatabaseSafe {
  authorizationToken: string;
}

export const toUserInDatabaseSafeWithToken = (
  data: unknown
): UserInDatabaseSafeWithToken | null => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (!('id' in data)) {
    return null;
  }

  if (typeof data.id !== 'number') {
    return null;
  }

  if (!('email' in data)) {
    return null;
  }

  if (!data.email || typeof data.email !== 'string') {
    return null;
  }

  if (!('fullName' in data)) {
    return null;
  }

  if (!data.fullName || typeof data.fullName !== 'string') {
    return null;
  }

  if (!('receiveInsiderEmails' in data)) {
    return null;
  }

  if (typeof data.receiveInsiderEmails !== 'boolean') {
    return null;
  }

  if (!('authorizationToken' in data)) {
    return null;
  }

  if (!data.authorizationToken || typeof data.authorizationToken !== 'string') {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    receiveInsiderEmails: data.receiveInsiderEmails,
    authorizationToken: data.authorizationToken,
  };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
      const authorizationToken = (getState() as RootState).me.user
        ?.authorizationToken;

      if (authorizationToken) {
        headers.set('authorization', `Bearer ${authorizationToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    ping: builder.query<string, void>({
      query: () => 'ping',
    }),
    signup: builder.mutation<UserInDatabaseSafe, SignupRequestBody>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    signin: builder.mutation<UserInDatabaseSafeWithToken, SignInRequestBody>({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
    createCourseDraft: builder.mutation<void, CreateCourseDraftRequestBody>({
      query: (body) => ({
        url: 'coursedrafts',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  usePingQuery,
  useSignupMutation,
  useSigninMutation,
  useCreateCourseDraftMutation,
} = apiSlice;
