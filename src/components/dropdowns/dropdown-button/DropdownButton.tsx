import { MainDropdownOpener } from '../MainDropdownOpener';
import { Button, Typography } from '@mui/material';
import { StyledTransparencyBox } from '../styled/StyledTransparencyBox';
import { StyledBox } from '../styled/StyledBox';
import { useContext } from 'react';
import { CloseMainDropdownContext } from '../../../contexts/CloseMainDropdownContext';

interface DropdownButtonProps {
  text: string;
  dropdownHeading: string;
  dropdownButtonText: string;
  onClick: () => void;
}

export const DropdownButton = ({
  text,
  dropdownHeading,
  dropdownButtonText,
  onClick,
}: DropdownButtonProps) => {
  return (
    <MainDropdownOpener text={text}>
      <StyledTransparencyBox
        sx={{
          bottom: 0,
          right: 0,
        }}
      >
        <StyledBox
          sx={{
            gap: 2,
            width: 260,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            {dropdownHeading}
          </Typography>
          <DropdownButtonButton text={dropdownButtonText} onClick={onClick} />
        </StyledBox>
      </StyledTransparencyBox>
    </MainDropdownOpener>
  );
};

interface DropdownButtonButtonProps {
  text: string;
  onClick?: () => void;
}

// NOTE: Component is needed to access maindropdown context.

const DropdownButtonButton = ({ text, onClick }: DropdownButtonButtonProps) => {
  const closeMainDropdown = useContext(CloseMainDropdownContext);

  const onClickWithClose = () => {
    onClick && onClick();
    closeMainDropdown();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={onClickWithClose}
    >
      {text}
    </Button>
  );
};
