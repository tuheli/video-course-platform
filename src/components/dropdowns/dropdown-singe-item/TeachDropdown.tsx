import { Typography } from '@mui/material';
import { TextDropdownOpener } from '../dropdown-openers/TextDropdownOpener';
import { StyledBox } from '../styled/StyledBox';
import { StyledTransparencyBox } from '../styled/StyledTransparencyBox';
import { DropdownButton } from './DropdownButton';

export const TeachDropdown = () => {
  const onClick = () => {};

  return (
    <TextDropdownOpener text="Teach on Lorem">
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
            Turn what you know into an opportunity and reach millions around the
            world.
          </Typography>
          <DropdownButton text="Learn More" onClick={onClick} />
        </StyledBox>
      </StyledTransparencyBox>
    </TextDropdownOpener>
  );
};
