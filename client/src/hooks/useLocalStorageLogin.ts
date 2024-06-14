import { useEffect, useState } from 'react';
import {
  toUserInDatabaseSafeWithToken,
  useValidateAuthorizationTokenMutation,
} from '../features/apiSlice';
import { useAppDispatch } from '../app/hooks';
import { signedIn } from '../features/meSlice';
import { useNavigate } from 'react-router-dom';

export const useLocalStorageLogin = () => {
  const [isLocalStorageLoginComplete, setIsLocalStorageLoginComplete] =
    useState(false);
  const [validateAuthorizationToken] = useValidateAuthorizationTokenMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

        if (userInDatabaseSafeWithToken === null) {
          localStorage.removeItem('signedInUser');
          navigate('/');
          return;
        }

        const validationPayload = await validateAuthorizationToken({
          userInDatabaseSafeWithToken,
        });

        if (!validationPayload.data) {
          localStorage.removeItem('signedInUser');
          navigate('/');
          return;
        }

        dispatch(signedIn(validationPayload.data));
      } catch (error) {
        localStorage.removeItem('signedInUser');
        navigate('/');
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
