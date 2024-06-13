import { Alert, Snackbar } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { message, severity } = useAppSelector((state) => state.notification);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!message) return;
    setIsOpen(true);
  }, [message]);

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
