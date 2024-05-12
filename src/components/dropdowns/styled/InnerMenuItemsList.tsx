import { StyledTransparencyBox } from './StyledTransparencyBox';
import { containerBorderWidth, transparentPaddingTop } from './common';
import { listWidth, StyledMenuItemsList } from './StyledMenuItemsList';

// NOTE: Border affects the size of elements. In order to keep the position accurate we take the borders into account while positioning.

// NOTE: The positioning is not perfect. Every second list doesnt have a left border which will cause too much left positioning.

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
            depthLevel % 2 === 0 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {children}
      </StyledMenuItemsList>
    </StyledTransparencyBox>
  );
};
