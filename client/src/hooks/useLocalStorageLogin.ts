import { useEffect, useState } from 'react';
import {
  toUserInDatabaseSafeWithToken,
  useValidateAuthorizationTokenMutation,
} from '../features/apiSlice';
import { useAppDispatch } from '../app/hooks';
import { signedIn } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

export const useLocalStorageLogin = () => {
  const [isLocalStorageLoginComplete, setIsLocalStorageLoginComplete] =
    useState(false);
  const [validateAuthorizationToken] = useValidateAuthorizationTokenMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginFromLocalStorage = async (): Promise<boolean> => {
    const userFromLocalStorageString = localStorage.getItem('signedInUser');

    if (!userFromLocalStorageString) return false;

    try {
      const userFromLocalStorageParsed = JSON.parse(userFromLocalStorageString);

      const userInDatabaseSafeWithToken = toUserInDatabaseSafeWithToken(
        userFromLocalStorageParsed
      );

      if (userInDatabaseSafeWithToken === null) return false;

      const validationPayload = await validateAuthorizationToken({
        userInDatabaseSafeWithToken,
      });

      if (!validationPayload.data) return false;

      dispatch(signedIn(validationPayload.data));
      return true;
    } catch (error) {
      return false;
    }
  };

  const asyncLocalStorageLogin = async () => {
    const isLoginSuccessful = await loginFromLocalStorage();

    if (!isLoginSuccessful) {
      localStorage.removeItem('signedInUser');
      navigate('/');
    }

    setIsLocalStorageLoginComplete(true);
  };

  useEffect(() => {
    asyncLocalStorageLogin();
  }, []);

  return { isLocalStorageLoginComplete };
};
