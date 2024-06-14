import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { removedNotification } from '../../features/notificationSlice';

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { message, severity } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (message) {
      setIsOpen(true);
    }
  }, [message]);

  useEffect(() => {
    setIsOpen(false);
    return () => {
      dispatch(removedNotification());
    };
  }, []);

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          variant: 'filled',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
