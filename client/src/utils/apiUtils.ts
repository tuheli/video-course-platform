import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const isDataWithMessage = (
  data: unknown
): data is { message: string } => {
  return (
    data != null &&
    typeof data === 'object' &&
    'message' in data &&
    typeof data.message === 'string'
  );
};

export const isObjectWithData = (obj: unknown): obj is { data: unknown } => {
  return (
    obj != null &&
    typeof obj === 'object' &&
    'data' in obj &&
    typeof obj.data === 'object'
  );
};

export const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};
