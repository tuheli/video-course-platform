import { Box } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface SpaceAround {
  spaceLeft: number;
  spaceRight: number;
  spaceAbove: number;
  spaceBelow: number;
}

export type RenderPosition = 'left' | 'right' | 'below';

export type AnchorPoint = 'bottom-left' | 'top-right' | 'bottom-right-end';

interface PortaledItemProps {
  anchorElement: HTMLElement | null;
  renderPosition?: RenderPosition;
  anchorpoint?: AnchorPoint;
  children?: React.ReactNode;
  customOffset?: { top: number; left: number };
}

interface Placement {
  top: number;
  left: number;
}

interface ReactangleSize {
  width: number;
  height: number;
}

const getFittingPosition = (
  portalSize: { width: number; height: number },
  parentSpaceAround: SpaceAround,
  errorMargin = 20
): RenderPosition => {
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

const getFlexDirectionForDirectionTriangle = (
  renderPosition: RenderPosition
) => {
  switch (renderPosition) {
    case 'right':
      return 'row';
    case 'left':
      return 'row';
    case 'below':
      return 'column';
    default:
      return undefined;
  }
};

const getTopRightPosition = (anchorElement: HTMLElement) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.top + window.scrollY - 1,
    left: anchor.right + window.scrollX,
  };

  return position;
};

const getBottomLeftPosition = (anchorElement: HTMLElement) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.bottom + window.scrollY,
    left: anchor.left + window.scrollX,
  };

  return position;
};

const getBottomRightPosition = (anchorElement: HTMLElement) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.bottom + window.scrollY,
    left: anchor.right + window.scrollX,
  };

  return position;
};

const getBottomRightEndPosition = (
  anchorElement: HTMLElement,
  myWidth: number
) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.bottom + window.scrollY,
    left: anchor.right + window.scrollX - myWidth,
  };

  return position;
};

const getCenteredRightPosition = (
  anchorElement: HTMLElement,
  mySize: ReactangleSize
) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.top + window.scrollY + (anchor.height - mySize.height) / 2,
    left: anchor.right + window.scrollX,
  };

  return position;
};

const getCenteredLeftPosition = (
  anchorElement: HTMLElement,
  mySize: ReactangleSize
) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.top + window.scrollY + (anchor.height - mySize.height) / 2,
    left: anchor.left + window.scrollX - mySize.width,
  };

  return position;
};

const getCenteredBottomPosition = (
  anchorElement: HTMLElement,
  mySize: ReactangleSize
) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.bottom + window.scrollY,
    left: anchor.left + window.scrollX + (anchor.width - mySize.width) / 2,
  };

  return position;
};

export const PortaledItem = ({
  anchorElement,
  renderPosition,
  children,
  customOffset,
  anchorpoint,
}: PortaledItemProps) => {
  const [position, setPosition] = useState<Placement | null>(null);
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
        zIndex: 2,
        top: position && position?.top && position.top + customOffsetTop,
        left: position && position?.left && position.left + customOffsetLeft,
      }}
    >
      {children}
    </Box>,
    document.body
  );
};
