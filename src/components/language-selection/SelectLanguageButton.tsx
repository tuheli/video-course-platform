import { useState } from 'react';
import { IconButton } from '@mui/material';
import { SelectLanguageModal } from './SelectLanguageModal';
import LanguageIcon from '@mui/icons-material/Language';

export const SelectLanguageButton = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onClick = () => {
    openModal();
  };

  return (
    <>
      <IconButton
        sx={{
          borderRadius: 0,
          color: 'text.primary',
        }}
        onClick={onClick}
      >
        <LanguageIcon />
      </IconButton>
      <SelectLanguageModal isOpen={open} onClose={closeModal} />
    </>
  );
};
