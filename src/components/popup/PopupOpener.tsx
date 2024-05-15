import { Box, SxProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface OpenerElementProps {
  children?: React.ReactNode;
  sx?: SxProps;
  useHover?: boolean;
  childSize?: ChildSize;
}

interface Offset {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface ChildSize {
  width: number;
  height: number;
}

const transparentPadding = 2;

type AnchorPosition = 'left' | 'right' | 'below' | 'above';

const getAutoPosition = (
  parentRef: React.RefObject<HTMLDivElement>,
  childSize: ChildSize
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

export const getOffset = (
  parentRef: React.RefObject<HTMLDivElement>,
  childRef: React.RefObject<HTMLDivElement>,
  anchor: AnchorPosition
) => {
  const parentHeight = parentRef.current?.clientHeight || 0;
  const childHeight = childRef.current?.clientHeight || 0;
  const centeredTop = (parentHeight - childHeight) / 2;

  const parentWidth = parentRef.current?.clientWidth || 0;
  const childWidth = childRef.current?.clientWidth || 0;
  const centeredLeft = (parentWidth - childWidth) / 2;

  switch (anchor) {
    case 'left':
      return {
        top: centeredTop,
        bottom: undefined,
        left: undefined,
        right: parentRef.current?.clientWidth,
      };
    case 'right':
      return {
        top: centeredTop,
        left: parentRef.current?.clientWidth,
        bottom: undefined,
        right: undefined,
      };
    case 'below':
      return {
        top: parentRef.current?.clientHeight,
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

export const PopupOpener = ({
  children,
  sx,
  childSize,
  useHover = true,
}: OpenerElementProps) => {
  const [isChildVisible, setIsChildVisible] = useState(false);
  const [childOffset, setChildOffset] = useState<Offset>({});
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentRef.current || !childRef.current) return;
    if (!childSize) return;

    const anchor = getAutoPosition(parentRef, childSize);
    const offset = getOffset(parentRef, childRef, anchor);

    setChildOffset(offset);
  }, [isChildVisible]);

  const onMouseEnterOpener = () => {
    if (!useHover) return;
    setIsChildVisible(true);
  };

  const onMouseLeaveOpener = () => {
    if (!useHover) return;
    setIsChildVisible(false);
  };

  return (
    <Box
      ref={parentRef}
      onMouseEnter={onMouseEnterOpener}
      onMouseLeave={onMouseLeaveOpener}
      sx={{
        position: 'relative',
        bgcolor: 'green',
        // width: 'max-content',
        ...sx,
      }}
    >
      {isChildVisible && (
        <Box
          sx={{
            bgcolor: 'lightblue',
            position: 'absolute',
            top: childOffset.top,
            left: childOffset.left,
            bottom: childOffset.bottom,
            right: childOffset.right,
            padding: transparentPadding,
            zIndex: 1,
          }}
        >
          <Box ref={childRef}>{children}</Box>
        </Box>
      )}
    </Box>
  );
};
