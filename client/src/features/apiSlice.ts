import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    ping: builder.query<string, void>({
      query: () => 'ping',
    }),
  }),
});

export const { usePingQuery } = apiSlice;
