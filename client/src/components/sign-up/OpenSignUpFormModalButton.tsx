import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { SignUpFormModal } from './SignUpModal';

interface OpenSignUpFormModalButtonProps {
  text: string;
}

export const OpenSignUpFormModalButton = ({
  text,
}: OpenSignUpFormModalButtonProps) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onClick = () => {
    openModal();
  };

  return (
    <>
      <Box>
        <Button variant="contained" color="primary" onClick={onClick} fullWidth>
          {text}
        </Button>
      </Box>
      <SignUpFormModal isOpen={open} onClose={closeModal} />
    </>
  );
};
