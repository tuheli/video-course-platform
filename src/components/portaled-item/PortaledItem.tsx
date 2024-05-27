import { Box } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  getSpaceAroundElement,
  getBottomLeftPosition,
  getTopRightPosition,
  getBottomRightEndPosition,
  getFittingPosition,
  getCenteredLeftPosition,
  getCenteredRightPosition,
  getCenteredBottomPosition,
} from './positioningUtilities';
import { Placement } from './positioningUtilities';
import { RenderPosition, AnchorPoint } from './positioningUtilities';

interface PortaledItemProps {
  anchorElement: HTMLElement | null;
  renderPosition?: RenderPosition;
  anchorpoint?: AnchorPoint;
  children?: React.ReactNode;
  customOffset?: { top: number; left: number };
}

export const PortaledItem = ({
  anchorElement,
  renderPosition,
  children,
  customOffset,
  anchorpoint,
}: PortaledItemProps) => {
  const [position, setPosition] = useState<Placement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const zIndex = 999999;

  useLayoutEffect(() => {
    const calculatePosition = () => {
      if (!anchorElement) return;
      if (!ref.current) return;

      const mySize = {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      };

      const spaceAroundAnchorElement = getSpaceAroundElement(anchorElement);

      let position;
      if (anchorpoint === 'bottom-left') {
        position = getBottomLeftPosition(anchorElement);
      } else if (anchorpoint === 'top-right') {
        position = getTopRightPosition(anchorElement);
      } else if (anchorpoint === 'bottom-right-end') {
        position = getBottomRightEndPosition(anchorElement, mySize.width);
      } else {
        const bestPosition =
          renderPosition !== undefined
            ? renderPosition
            : getFittingPosition(mySize, spaceAroundAnchorElement);

        switch (bestPosition) {
          case 'left':
            position = getCenteredLeftPosition(anchorElement, mySize);
            break;
          case 'right':
            position = getCenteredRightPosition(anchorElement, mySize);
            break;
          case 'below':
            position = getCenteredBottomPosition(anchorElement, mySize);
            break;
        }
      }

      setPosition({
        top: position.top,
        left: position.left,
      });
    };

    if (!anchorElement) return;

    calculatePosition();
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [anchorElement, anchorpoint, renderPosition]);

  const customOffsetTop = customOffset?.top || 0;
  const customOffsetLeft = customOffset?.left || 0;

  return createPortal(
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        position: 'absolute',
        zIndex,
        top: position && position?.top && position.top + customOffsetTop,
        left: position && position?.left && position.left + customOffsetLeft,
      }}
    >
      {children}
    </Box>,
    document.body
  );
};
