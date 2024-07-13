import { StyledMenuItemsList } from './StyledMenuItemsList';
import { StyledTransparencyBox } from './StyledTransparencyBox';
import {
  containerBorderColor,
  containerBorderStyle,
  containerBorderWidth,
  listWidth,
  transparentPaddingTop,
} from './common';

// NOTE: Border affects the size of elements. In order
// to keep the position accurate we take the borders
// into account while positioning.

// NOTE: The positioning is not perfect. Every second
// list doesnt have a left border which will cause too
// much left positioning. However it is not noticeable
// with 3 levels of depth.

interface InnerMenuItemsListProps {
  children: React.ReactNode;
  depthLevel: number;
}

export const InnerMenuItemsList = ({
  children,
  depthLevel,
}: InnerMenuItemsListProps) => {
  return (
    <StyledTransparencyBox
      sx={{
        top: -containerBorderWidth - transparentPaddingTop,
        left: listWidth - containerBorderWidth,
        width: listWidth,
      }}
    >
      <StyledMenuItemsList
        sx={{
          borderLeft:
            depthLevel % 2 === 0
              ? `${containerBorderWidth} ${containerBorderStyle} ${containerBorderColor}`
              : 'none',
        }}
      >
        {children}
      </StyledMenuItemsList>
    </StyledTransparencyBox>
  );
};
