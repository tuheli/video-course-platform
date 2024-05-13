import { Typography } from '@mui/material';
import { TextDropdownOpener } from '../dropdown-openers/TextDropdownOpener';
import { StyledBox } from '../styled/StyledBox';
import { StyledTransparencyBox } from '../styled/StyledTransparencyBox';
import { DropdownButton } from './DropdownButton';

export const BusinessDropdown = () => {
  const onClick = () => {};

  return (
    <TextDropdownOpener text="Lorem Business">
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
            Get your team access to over 25,000 top Lorem courses, anytime,
            anywhere.
          </Typography>
          <DropdownButton text="Try Lorem Business" onClick={onClick} />
        </StyledBox>
      </StyledTransparencyBox>
    </TextDropdownOpener>
  );
};
