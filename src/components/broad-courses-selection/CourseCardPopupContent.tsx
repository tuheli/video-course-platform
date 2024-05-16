import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import '../dropdowns/animations/fadeAnimation.css';

interface PositionOffset {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface SpaceAround {
  spaceLeft: number;
  spaceRight: number;
  spaceAbove: number;
  spaceBelow: number;
}

interface RectangleSize {
  width: number;
  height: number;
}

type RenderPosition = 'left' | 'right' | 'below' | 'above';

const popupCardSize = { width: 200, height: 300 };

const getAnchorPosition = (
  popupSize: RectangleSize,
  parentSpaceAround: SpaceAround
): Omit<RenderPosition, 'above'> => {
  const fitsRight = parentSpaceAround.spaceRight >= popupSize.width;
  const fitsLeft = parentSpaceAround.spaceLeft >= popupSize.width;

  if (fitsRight) return 'right';
  if (fitsLeft) return 'left';
  return 'below';
};

const getOffset = (
  parentSize: RectangleSize,
  childSize: RectangleSize,
  anchor: Omit<RenderPosition, 'above'>
) => {
  const centeredTop = (parentSize.height - childSize.height) / 2;
  const centeredLeft = (parentSize.width - childSize.width) / 2;

  switch (anchor) {
    case 'left':
      return {
        top: centeredTop,
        bottom: undefined,
        left: undefined,
        right: parentSize.width,
      };
    case 'right':
      return {
        top: centeredTop,
        left: parentSize.width,
        bottom: undefined,
        right: undefined,
      };
    case 'below':
      return {
        top: parentSize.height,
        left: centeredLeft,
        bottom: undefined,
        right: undefined,
      };

    default:
      return {
        top: parentSize.height,
        left: centeredLeft,
        bottom: undefined,
        right: undefined,
      };
  }
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

export const CourseCardPopupContent = () => {
  const [positionOffset, setPositionOffset] = useState<PositionOffset | null>(
    null
  );
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!divRef.current) return;
    if (!divRef.current.parentElement) return;

    const parentElement = divRef.current.parentElement;

    const popupSize = {
      width: popupCardSize.width,
      height: popupCardSize.height,
    };

    const parentSpaceAround = getSpaceAroundElement(parentElement);

    const anchor = getAnchorPosition(popupSize, parentSpaceAround);

    const parentSize: RectangleSize = {
      width: parentElement.clientWidth,
      height: parentElement.clientHeight,
    };

    const offset = getOffset(parentSize, popupSize, anchor);

    setPositionOffset(offset);
  }, []);

  // NOTE: The position calculation uses clientwidth and clientheight so dont add margin or borders to the divref element. Padding is ok.

  return (
    <Box
      ref={divRef}
      sx={{
        position: 'absolute',
        zIndex: 1,
        top: positionOffset?.top,
        bottom: positionOffset?.bottom,
        left: positionOffset?.left,
        right: positionOffset?.right,
        width: popupCardSize.width,
        height: popupCardSize.height,
        backgroundColor: 'rgba(0,0,0, 0.25)',
        color: 'white',
        animation: 'fadeIn 0.2s',
        bgcolor: 'rgba(0,0,0,0.25)',
      }}
    ></Box>
  );
};
