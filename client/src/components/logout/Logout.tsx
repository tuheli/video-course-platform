import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { signedOut } from '../../features/meSlice';

export const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(signedOut());
  }, [dispatch]);

  return null;
};
