import { ComponentType, useRef, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import { useClickAwayListener } from '../../../hooks/useClickAwayListener';
import { CloseDropdownContext } from '../../../contexts/CloseDropdownContext';
import {
  AnchorPoint,
  PortaledItem,
  RenderPosition,
} from '../../portaled-item/PortaledItem';

interface ComponentProps {}

type RenderComponentType = ComponentType<ComponentProps>;

// NOTE: Force open is only for developing purposes to keep a dropdown open.

interface MainDropdownOpenerProps {
  RenderComponent: RenderComponentType;
  children: React.ReactNode;
  forceOpen: boolean;
  usePortal: boolean;
  renderPosition?: RenderPosition;
  anchorpoint?: AnchorPoint;
  height?: string | number;
  sx?: SxProps;
  customOffset?: { top: number; left: number };
}

// NOTE: When modifying list sizes -> In order for the hover to work, the elements that are descendants of this dropdown must not have a gap between them so the mouse does not leave the dropdown and close..

// NOTE: This component is for large screens with mouse hover.

// Alternatively use mouse clicks or hover to open dropdown menus. Setting this to false is actually not useful since the both functionalities hover and click are needed. Hover opens menus and clicking will trigger navigation.
export const useHover = true;

// TODO: Remove the default height and update appbar dropdowns to input the needed heights.

export const MainDropdownOpener = ({
  RenderComponent,
  children,
  sx,
  renderPosition,
  forceOpen = false,
  usePortal = false,
  anchorpoint,
  customOffset,
}: MainDropdownOpenerProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const onMouseEnter = () => {
    if (!useHover) return;
    setIsDropdownOpen(true);
  };

  const onMouseLeaveDropdown = () => {
    if (!useHover) return;
    setIsDropdownOpen(false);
  };

  const onClick = () => {
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
          <PortaledItem
            anchorElement={divRef.current}
            renderPosition={renderPosition}
            anchorpoint={anchorpoint}
            customOffset={customOffset}
          >
            {children}
          </PortaledItem>
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
      }}
    >
      <CloseDropdownContext.Provider value={contextValue}>
        <Box onMouseEnter={onMouseEnter}>
          <RenderComponent />
        </Box>
        {getChildrenToRender()}
      </CloseDropdownContext.Provider>
    </Box>
  );
};
