import { ComponentType, useRef, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import { StyledMenuItemLink } from '../styled/StyledMenuItemLink';
import { useClickAwayListener } from '../../../hooks/useClickAwayListener';
import { CloseDropdownContext } from '../../../contexts/CloseDropdownContext';
import { mainDropdownOpenerHeight as appBarDropdownOpenerHeight } from '../styled/common';
import { PortaledItem } from '../../portaled-item/PortaledItem';

interface ComponentProps {
  sx?: SxProps;
  isDropdownOpen?: boolean;
}

type RenderComponentType = ComponentType<ComponentProps>;

// NOTE: Force open is only for developing purposes to keep a dropdown open.

interface MainDropdownOpenerProps {
  RenderComponent: RenderComponentType;
  children: React.ReactNode;
  forceOpen: boolean;
  usePortal: boolean;
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
  forceOpen = false,
  usePortal = false,
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

  const contextValue = {
    isDropdownOpen,
    closeMainDropdown,
  };

  useClickAwayListener(divRef, isDropdownOpen, useHover, closeMainDropdown);

  const getChildrenToRender = () => {
    if (forceOpen || isDropdownOpen) {
      if (usePortal) {
        return (
          <PortaledItem anchorElement={divRef.current}>{children}</PortaledItem>
        );
      }
      return children;
    }
  };

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
      <CloseDropdownContext.Provider value={contextValue}>
        <StyledMenuItemLink
          onMouseEnter={onMouseEnterCategories}
          onClick={onClickCategories}
        >
          <RenderComponent />
        </StyledMenuItemLink>
        {getChildrenToRender()}
      </CloseDropdownContext.Provider>
    </Box>
  );
};
