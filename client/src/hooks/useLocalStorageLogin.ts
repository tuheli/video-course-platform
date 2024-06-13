import { useEffect, useState } from 'react';
import { toUserInDatabaseSafeWithToken } from '../features/apiSlice';
import { useAppDispatch } from '../app/hooks';
import { signedIn } from '../features/meSlice';

export const useLocalStorageLogin = () => {
  const [isLocalStorageLoginComplete, setIsLocalStorageLoginComplete] =
    useState(false);
  const dispatch = useAppDispatch();

  const loginFromLocalStorage = async () => {
    const userFromLocalStorageString = localStorage.getItem('signedInUser');

    if (userFromLocalStorageString) {
      try {
        const userFromLocalStorageParsed = JSON.parse(
          userFromLocalStorageString
        );

        const userInDatabaseSafeWithToken = toUserInDatabaseSafeWithToken(
          userFromLocalStorageParsed
        );

        if (userInDatabaseSafeWithToken !== null) {
          dispatch(signedIn(userInDatabaseSafeWithToken));
        }
      } catch (error) {
        // Ignore error
      }
    }
  };

  const asyncLocalStorageLogin = async () => {
    await loginFromLocalStorage();
    setIsLocalStorageLoginComplete(true);
  };

  useEffect(() => {
    asyncLocalStorageLogin();
  }, []);

  return { isLocalStorageLoginComplete };
};
