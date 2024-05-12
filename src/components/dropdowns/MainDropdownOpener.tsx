import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { StyledMenuItemLink } from './styled/StyledMenuItemLink';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';
import { CloseMainDropdownContext } from '../../contexts/CloseMainDropdownContext';
import { mainDropdownOpenerHeight } from './styled/common';
import './fadeAnimation.css';

interface MainDropdownOpenerProps {
  text: string;
  children: React.ReactNode;
}

// NOTE: In order for the hover to work, the elements that are descendants of this dropdown must not have a gap between them so the mouse does not leave the dropdown and close.

// Alternatively use mouse clicks or hover to open dropdown menus.
export const useHover = true;

export const MainDropdownOpener = ({
  text,
  children,
}: MainDropdownOpenerProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const onMouseEnterCategories = () => {
    if (!useHover) return;
    setIsDropdownOpen(true);
  };

  const onMouseLeaveDropdown = () => {
    if (!useHover) return;
    setIsDropdownOpen(false);
  };

  const onClickCategories = () => {
    if (useHover) return;
    setIsDropdownOpen(true);
  };

  const closeMainDropdown = () => {
    setIsDropdownOpen(false);
  };

  useClickAwayListener(divRef, isDropdownOpen, useHover, closeMainDropdown);

  return (
    <Box
      ref={divRef}
      onMouseLeave={onMouseLeaveDropdown}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        height: mainDropdownOpenerHeight,
      }}
    >
      <StyledMenuItemLink
        onMouseEnter={onMouseEnterCategories}
        onClick={onClickCategories}
      >
        <Typography
          variant="body2"
          sx={{
            color: isDropdownOpen ? 'secondary.main' : 'text.secondary',
            '&:hover': {
              color: 'secondary.main',
            },
          }}
        >
          {text}
        </Typography>
      </StyledMenuItemLink>
      {isDropdownOpen && (
        <CloseMainDropdownContext.Provider value={closeMainDropdown}>
          {children}
        </CloseMainDropdownContext.Provider>
      )}
    </Box>
  );
};
