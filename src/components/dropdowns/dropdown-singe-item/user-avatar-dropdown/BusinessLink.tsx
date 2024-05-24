import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { menuItemPadding } from './Dropdown';
import { useDropdownContext } from '../../../../hooks/useDropdownContext';

export const BusinessLink = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { closeMainDropdown } = useDropdownContext();

  const onClickLink = () => {
    closeMainDropdown();
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      onClick={onClickLink}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      to="/"
      style={{
        textDecoration: 'none',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          padding: menuItemPadding,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            width: '100%',
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              color: isHovered ? 'secondary.main' : 'text.primary',
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            Lorem Business
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
            }}
          >
            Bring learning to your company
          </Typography>
        </Stack>
        <ExitToAppIcon
          sx={{
            color: 'text.primary',
          }}
        />
      </Stack>
    </Link>
  );
};
