import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import '../dropdowns/animations/fadeAnimation.css';

interface PositionOffset {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface Size {
  width: number;
  height: number;
}

type AnchorPosition = 'left' | 'right' | 'below' | 'above';

const getAnchorPosition = (
  parentRef: React.RefObject<HTMLDivElement>,
  childSize: Size
): AnchorPosition => {
  const parentRect = parentRef.current?.getBoundingClientRect();
  const parentWidth = parentRect?.width || 0;
  const parentHeight = parentRect?.height || 0;

  const childWidth = childSize.width;
  const childHeight = childSize.height;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const parentTop = parentRect?.top || 0;
  const parentLeft = parentRect?.left || 0;

  const parentBottom = parentTop + parentHeight;
  const parentRight = parentLeft + parentWidth;

  const spaceAbove = parentTop;
  const spaceBelow = windowHeight - parentBottom;
  const spaceLeft = parentLeft;
  const spaceRight = windowWidth - parentRight;

  const canFitAbove = spaceAbove > childHeight / 2;
  const canFitBelow = spaceBelow > childHeight / 2;
  const canFitLeft = spaceLeft > childWidth / 2;
  const canFitRight = spaceRight > childWidth / 2;

  if (canFitRight && canFitAbove && canFitBelow) {
    return 'right';
  }

  if (canFitLeft && canFitAbove && canFitBelow) {
    return 'left';
  }

  if (canFitBelow && canFitLeft && canFitRight) {
    return 'below';
  }

  if (canFitAbove && canFitLeft && canFitRight) {
    return 'above';
  }

  // Child is too big to fit properly
  return 'below';
};

const getOffset = (
  parent: HTMLElement,
  childRef: React.RefObject<HTMLDivElement>,
  anchor: AnchorPosition
) => {
  const parentHeight = parent.clientHeight || 0;
  const childHeight = childRef.current?.clientHeight || 0;
  const centeredTop = (parentHeight - childHeight) / 2;

  const parentWidth = parent.clientWidth || 0;
  const childWidth = childRef.current?.clientWidth || 0;
  const centeredLeft = (parentWidth - childWidth) / 2;

  switch (anchor) {
    case 'left':
      return {
        top: centeredTop,
        bottom: undefined,
        left: undefined,
        right: parent.clientWidth,
      };
    case 'right':
      return {
        top: centeredTop,
        left: parent.clientWidth,
        bottom: undefined,
        right: undefined,
      };
    case 'below':
      return {
        top: parent.clientHeight,
        left: centeredLeft,
        bottom: undefined,
        right: undefined,
      };
    case 'above':
      return {
        top: childHeight * -1,
        left: centeredLeft,
        bottom: undefined,
        right: undefined,
      };
    default:
      return {
        top: centeredTop,
        left: centeredLeft,
        bottom: 0,
        right: 0,
      };
  }
};

export const CourseCardPopupContent = () => {
  const [positionOffset, setPositionOffset] = useState<PositionOffset | null>(
    null
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const size = { width: 300, height: 300 };

  useEffect(() => {
    if (!ref.current) return;
    if (!ref.current.parentElement) return;

    const anchor = getAnchorPosition(ref, {
      width: size.width,
      height: size.height,
    });

    const offset = getOffset(ref.current.parentElement, ref, anchor);
    setPositionOffset(offset);
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'absolute',
        zIndex: 1,
        top: positionOffset?.top,
        bottom: positionOffset?.bottom,
        left: positionOffset?.left,
        right: positionOffset?.right,
        width: size.width,
        height: size.height,
        backgroundColor: 'rgba(0,0,0, 0.25)',
        color: 'white',
        animation: 'fadeIn 0.2s',
      }}
    >
      HELLO WORLD HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO
      WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO
      WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO
      WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO
      WORLDHELLO WORLDHELLO WORLDHELLO
    </Box>
  );
};
