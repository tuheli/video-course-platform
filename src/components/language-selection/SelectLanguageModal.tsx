import {
  Backdrop,
  Box,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { ColumnOrderedGrid } from '../column-ordered-grid/ColumnOrderedGrid';
import CloseIcon from '@mui/icons-material/Close';
import { useDisableScrollbar } from '../../hooks/useDisableScrollbar';
import { getLanguages } from '../../../data/languageData';
import { SelectLanguageButton } from './SelectLanguageButton';

// NOTE: Dont use mui Fade animation wrapper component with this modal. This component uses custom hook to disable scrollbar and set padding while modal is open. Otherwise the Fade animations and scrollbar enable/disable hook effects would need to be happening in sync.

interface SelectLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelectLanguageModal = ({
  isOpen,
  onClose,
}: SelectLanguageModalProps) => {
  const languages = getLanguages();
  const languageComponents = languages.map((language) => ({
    RenderComponent: () => (
      <SelectLanguageButton language={language} closeModal={onClose} />
    ),
  }));

  useDisableScrollbar(isOpen);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
      disableScrollLock
    >
      <>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            p: 4,
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              pb: 1.5,
            }}
          >
            <Typography variant="h5">Choose a language</Typography>
            <IconButton
              onClick={onClose}
              sx={{
                background: 'none',
                translate: '12px -12px',
                borderRadius: 0,
                '&:hover': {
                  background: 'none',
                },
              }}
            >
              <CloseIcon
                sx={{
                  fontSize: 18,
                }}
              />
            </IconButton>
          </Stack>
          <ColumnOrderedGrid items={languageComponents} stackHeight={4} />
        </Box>
      </>
    </Modal>
  );
};
