import {
  Backdrop,
  Box,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { ColumnOrderedGrid } from '../column-ordered-grid/ColumnOrderedGrid';
import { languages } from '../../../data/languageData';
import CloseIcon from '@mui/icons-material/Close';
import { useDisableScrollbar } from '../../hooks/useDisableScrollbar';

// NOTE: I removed fade animation wrapper to prevent seeing a change in document padding when modal is still fading away but scrollbar becomes visible and extra document body padding is removed.

interface SelectLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelectLanguageModal = ({
  isOpen,
  onClose,
}: SelectLanguageModalProps) => {
  // When used add item: ColumOrderedGridItem as an argument to use the items data in this function. I removed it to silence unused argument warning.
  const onClickLanguage = () => {
    onClose();
  };

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
            <Typography variant="h5" sx={{}}>
              Choose a language
            </Typography>
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
          <ColumnOrderedGrid
            items={languages}
            stackHeight={4}
            onClickItem={onClickLanguage}
          />
        </Box>
      </>
    </Modal>
  );
};
