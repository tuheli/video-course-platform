import { Stack, Typography } from '@mui/material';
import { UserAvatar } from '../../../me/UserAvatar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { menuItemPadding, avatarSize } from './Dropdown';
import { useDropdownContext } from '../../../../hooks/useDropdownContext';

interface UserDetailsLinkProps {
  fullName: string;
  email: string;
}

export const UserDetailsLink = ({ fullName, email }: UserDetailsLinkProps) => {
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
          gap: 2,
          p: menuItemPadding,
        }}
      >
        <UserAvatar
          sx={{
            width: avatarSize,
            height: avatarSize,
            fontSize: 32,
            fontWeight: 600,
          }}
        />
        <Stack
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: isHovered ? 'secondary.main' : 'text.primary',
            }}
          >
            {fullName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              wordBreak: 'break-all',
            }}
          >
            {email}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};
