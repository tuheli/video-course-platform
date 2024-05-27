import { ComponentType, useRef, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import { CloseDropdownContext } from '../../../contexts/CloseDropdownContext';
import { PortaledItem } from '../../portaled-item/PortaledItem';
import {
  AnchorPoint,
  RenderPosition,
} from '../../portaled-item/positioningUtilities';

export interface OpenerProps {
  isDropdownOpen: boolean;
}

type RenderComponentType = ComponentType<OpenerProps>;

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
  isMainDropdown: boolean;
  openerContainerSx?: SxProps;
}

export const MainDropdownOpener = ({
  RenderComponent,
  children,
  sx,
  renderPosition,
  forceOpen = false,
  usePortal = false,
  anchorpoint,
  customOffset,
  isMainDropdown,
  openerContainerSx,
}: MainDropdownOpenerProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const onMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const onMouseLeaveDropdown = () => {
    setIsDropdownOpen(false);
  };

  const closeMainDropdown = () => {
    setIsDropdownOpen(false);
  };

  const contextValue = {
    isDropdownOpen,
    closeMainDropdown,
  };

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
      {isMainDropdown && (
        <CloseDropdownContext.Provider value={contextValue}>
          <Box
            onMouseEnter={onMouseEnter}
            sx={{
              ...openerContainerSx,
            }}
          >
            <RenderComponent isDropdownOpen={isDropdownOpen} />
          </Box>
          {getChildrenToRender()}
        </CloseDropdownContext.Provider>
      )}
      {!isMainDropdown && (
        <>
          <Box onMouseEnter={onMouseEnter}>
            <RenderComponent isDropdownOpen={isDropdownOpen} />
          </Box>
          {getChildrenToRender()}
        </>
      )}
    </Box>
  );
};
