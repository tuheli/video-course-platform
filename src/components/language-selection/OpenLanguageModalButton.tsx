import { useState } from 'react';
import { Box, IconButton, SxProps, Typography } from '@mui/material';
import { SelectLanguageModal } from './SelectLanguageModal';
import LanguageIcon from '@mui/icons-material/Language';

interface SelectLanguageButtonProps {
  text?: string;
  sx?: SxProps;
}

export const OpenLanguageModalButton = ({
  text,
  sx,
}: SelectLanguageButtonProps) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onClick = () => {
    openModal();
  };

  return (
    <>
      <Box>
        <IconButton
          sx={{
            borderRadius: 0,
            color: 'text.primary',
            ...sx,
          }}
          onClick={onClick}
        >
          <LanguageIcon />
          {text && (
            <Typography
              variant="body2"
              sx={{
                pl: 0.5,
              }}
            >
              {text}
            </Typography>
          )}
        </IconButton>
      </Box>
      <SelectLanguageModal isOpen={open} onClose={closeModal} />
    </>
  );
};
