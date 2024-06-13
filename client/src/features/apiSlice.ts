import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

interface UserInDatabaseSafe {
  id: number;
  email: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface UserInDatabaseSafeWithToken extends UserInDatabaseSafe {
  authenticationToken: string;
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

  if (!('authenticationToken' in data)) {
    return null;
  }

  if (
    !data.authenticationToken ||
    typeof data.authenticationToken !== 'string'
  ) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    receiveInsiderEmails: data.receiveInsiderEmails,
    authenticationToken: data.authenticationToken,
  };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
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
  }),
});

export const { usePingQuery, useSignupMutation, useSigninMutation } = apiSlice;
