import { useRef, useState } from 'react';
import { categoriesData } from './categoriesData';
import { MenuItems } from './MenuItems';
import {
  OuterMenuItemsList,
  mainDropdownOpenerHeight,
} from './StyledMenuItemsList';
import { Box, Typography } from '@mui/material';
import './fadeAnimation.css';
import { StyledMenuItemLink } from './StyledMenuItemLink';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';

// NOTE: In order for the hover to work, the elements that are descendants of this dropdown must not have a gap between them so the mouse does not leave the dropdown and close.

// Alternatively use mouse clicks or hover to open dropdown menus.
export const useHover = false;

export const CategoriesDropdown = () => {
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
        display: 'flex',
        alignItems: 'center',
        height: mainDropdownOpenerHeight,
      }}
    >
      <StyledMenuItemLink
        onMouseEnter={onMouseEnterCategories}
        onClick={onClickCategories}
      >
        <Typography variant="body2">Categories</Typography>
      </StyledMenuItemLink>
      {isDropdownOpen && (
        <OuterMenuItemsList>
          {categoriesData.map((menuItem, index) => {
            return (
              <MenuItems
                key={index}
                menuItem={menuItem}
                depthLevel={1}
                closeMainDropdown={closeMainDropdown}
              />
            );
          })}
        </OuterMenuItemsList>
      )}
    </Box>
  );
};
