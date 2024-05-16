import { ComponentType, useRef, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import { StyledMenuItemLink } from '../styled/StyledMenuItemLink';
import { useClickAwayListener } from '../../../hooks/useClickAwayListener';
import { CloseMainDropdownContext } from '../../../contexts/CloseMainDropdownContext';
import { mainDropdownOpenerHeight as appBarDropdownOpenerHeight } from '../styled/common';

interface ComponentProps {
  sx?: SxProps;
  isDropdownOpen?: boolean;
}

type RenderComponentType = ComponentType<ComponentProps>;

interface MainDropdownOpenerProps {
  RenderComponent: RenderComponentType;
  children: React.ReactNode;
  height?: string | number;
  sx?: SxProps;
}

// NOTE: When modifying list sizes -> In order for the hover to work, the elements that are descendants of this dropdown must not have a gap between them so the mouse does not leave the dropdown and close..

// NOTE: This component is for large screens with mouse hover.

// Alternatively use mouse clicks or hover to open dropdown menus. Setting this to false is actually not useful since the both functionalities hover and click are needed. Hover opens menus and clicking will trigger navigation.
export const useHover = true;

// TODO: Remove the default height and update appbar dropdowns to input the needed heights.

export const MainDropdownOpener = ({
  RenderComponent,
  children,
  height = appBarDropdownOpenerHeight,
  sx,
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
        ...sx,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        height: height,
      }}
    >
      <StyledMenuItemLink
        onMouseEnter={onMouseEnterCategories}
        onClick={onClickCategories}
      >
        <RenderComponent
          isDropdownOpen={isDropdownOpen}
          sx={{
            color: isDropdownOpen ? 'secondary.main' : 'text.primary',
          }}
        />
      </StyledMenuItemLink>
      {isDropdownOpen && (
        <CloseMainDropdownContext.Provider value={closeMainDropdown}>
          {children}
        </CloseMainDropdownContext.Provider>
      )}
    </Box>
  );
};
