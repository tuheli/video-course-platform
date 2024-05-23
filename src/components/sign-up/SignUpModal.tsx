import { Backdrop, Box, IconButton, Modal } from '@mui/material';
import { useDisableScrollbar } from '../../hooks/useDisableScrollbar';
import { SignUpForm } from './SignUpForm';
import CloseIcon from '@mui/icons-material/Close';

// NOTE: The sign up form submission signs in the user on success which will cause the routes to change. Therefore no need to handle modal closing etc.

interface SignUpFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignUpFormModal = ({ isOpen, onClose }: SignUpFormModalProps) => {
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
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            border: '1px solid #000',
          }}
        >
          <SignUpForm />
          <Box
            sx={{
              position: 'absolute',
              top: 26,
              right: 26,
              transform: 'translate(50%, -50%)',
            }}
          >
            <IconButton size="small" onClick={onClose}>
              <CloseIcon
                sx={{
                  fontSize: 'medium',
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </>
    </Modal>
  );
};
