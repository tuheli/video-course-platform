import { useRef, useState } from 'react';
import { categoriesData } from './categoriesData';
import { MenuItems } from './MenuItems';
import { OuterMenuItemsList } from './StyledMenuItemsList';
import { Box, Typography } from '@mui/material';
import './fadeAnimation.css';
import { StyledMenuItemLink } from './StyledMenuItemLink';

// NOTE: In order for the hover to work, the elements that are descendants of this dropdown must not have a gap between them so the mouse does not leave the dropdown and close.

export const mainDropdownOpenerHeight = 62;

export const CategoriesDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const onMouseEnterCategories = () => {
    setIsDropdownOpen(true);
  };

  const onMouseLeaveDropdown = () => {
    setIsDropdownOpen(false);
  };

  const closeMainDropdown = () => {
    setIsDropdownOpen(false);
  };

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
      <StyledMenuItemLink onMouseEnter={onMouseEnterCategories}>
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
