import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { removedNotification } from '../../features/notificationSlice';

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { message, severity } = useAppSelector((state) => state.notification);
  const [renderMessage, setRenderMessage] = useState('');
  const dispatch = useAppDispatch();

  const onClose = () => {
    setIsOpen(false);
    dispatch(removedNotification());
  };

  useEffect(() => {
    if (!message) return;
    setRenderMessage(message);
    setIsOpen(true);
  }, [message]);

  useEffect(() => {
    return () => {
      onClose();
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
        {renderMessage}
      </Alert>
    </Snackbar>
  );
};
