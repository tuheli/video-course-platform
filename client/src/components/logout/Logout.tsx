import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { signedOut } from '../../features/meSlice';
import { apiSlice } from '../../features/apiSlice';

export const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(apiSlice.util.resetApiState());
    dispatch(signedOut());
  }, [dispatch]);

  return null;
};
