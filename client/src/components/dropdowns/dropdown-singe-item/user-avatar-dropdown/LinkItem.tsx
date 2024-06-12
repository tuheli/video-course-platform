import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { menuItemPadding, menuItemHeight } from './Dropdown';
import { useDropdownContext } from '../../../../hooks/useDropdownContext';

interface LinkItemProps {
  text: string;
  to: string;
  children?: React.ReactNode;
}

export const LinkItem = ({ text, to, children }: LinkItemProps) => {
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
      to={to}
      style={{
        textDecoration: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: menuItemPadding,
          height: menuItemHeight,
        }}
      >
        <Typography
          sx={{
            width: '100%',
            color: isHovered ? 'secondary.main' : 'text.primary',
            '&:hover': {
              color: 'secondary.main',
            },
          }}
        >
          {text}
        </Typography>
        {children}
      </Box>
    </Link>
  );
};
