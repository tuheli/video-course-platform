import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CredentialsNotSafe {
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
  id: string;
  email: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface UserInDatabaseSafeWithToken extends UserInDatabaseSafe {
  authenticationToken: string;
}

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
