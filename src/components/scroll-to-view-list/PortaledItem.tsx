import { Box } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface SpaceAround {
  spaceLeft: number;
  spaceRight: number;
  spaceAbove: number;
  spaceBelow: number;
}

type RenderPosition = 'left' | 'right' | 'below' | 'above';

interface PortaledItemProps {
  anchorElement: HTMLElement | null;
  children?: React.ReactNode;
}

const getFittingPosition = (
  portalSize: { width: number; height: number },
  parentSpaceAround: SpaceAround,
  errorMargin = 20
): Omit<RenderPosition, 'above'> => {
  const fitsRight =
    parentSpaceAround.spaceRight - errorMargin >= portalSize.width;
  const fitsLeft =
    parentSpaceAround.spaceLeft + errorMargin >= portalSize.width;

  if (fitsRight) return 'right';
  if (fitsLeft) return 'left';
  return 'below';
};

const getSpaceAroundElement = (element: HTMLElement): SpaceAround => {
  const rect = element.getBoundingClientRect();
  return {
    spaceLeft: rect.left,
    spaceRight: window.innerWidth - rect.right,
    spaceAbove: rect.top,
    spaceBelow: window.innerHeight - rect.bottom,
  };
};

export const PortaledItem = ({
  anchorElement,
  children,
}: PortaledItemProps) => {
  const [position, setPosition] = useState<
    { top: number; left: number } | undefined
  >();
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const calculatePosition = () => {
      if (!anchorElement) return;
      if (!ref.current) return;

      const mySize = {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      };

      const spaceAroundAnchorElement = getSpaceAroundElement(anchorElement);

      const bestPosition = getFittingPosition(mySize, spaceAroundAnchorElement);

      let leftOffset = 0;
      let topOffset = 0;

      switch (bestPosition) {
        case 'left':
          leftOffset -= mySize.width;
          topOffset += (anchorElement.offsetHeight - mySize.height) / 2;
          break;
        case 'right':
          leftOffset += anchorElement.offsetWidth;
          topOffset += (anchorElement.offsetHeight - mySize.height) / 2;
          break;
        case 'below':
          leftOffset += (anchorElement.offsetWidth - mySize.width) / 2;
          topOffset += anchorElement.offsetHeight;
          break;
      }

      const anchorRect = anchorElement.getBoundingClientRect();
      setPosition({
        top: anchorRect.top + window.scrollY + topOffset,
        left: anchorRect.left + window.scrollX + leftOffset,
      });
    };

    if (!anchorElement) return;

    calculatePosition();
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [anchorElement]);

  return createPortal(
    <Box
      ref={ref}
      sx={{
        position: 'absolute',
        top: position?.top,
        left: position?.left,
      }}
    >
      {children}
    </Box>,
    document.body
  );
};
