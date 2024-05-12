import { styled } from '@mui/system';
import { ReactNode } from 'react';
import { mainDropdownOpenerHeight } from './CategoriesDropdown';
import { Box } from '@mui/material';

// NOTE: Border affects the size of elements. In order to keep the position accurate we take the borders into account while positioning.

// NOTE: The positioning is not perfect. Uneven depth lists dont have left border which will cause too much left positioning.

interface InnerMenuItemsListProps {
  children: ReactNode;
  depthLevel: number;
}

const listWidth = 240;
const transparentPaddingTop = 10;

const StyledMenuItemsList = styled('ul')({
  backgroundColor: 'white',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  listStyleType: 'none',
  position: 'absolute',
  height: 360,
  width: listWidth,
  padding: 0,
  margin: 0,
});

const TransparencyBox = styled(Box)({
  backgroundColor: 'transparent',
  border: '1px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  width: listWidth,
  padding: 0,
  paddingTop: transparentPaddingTop,
  margin: 0,
  top: mainDropdownOpenerHeight,
  left: 0,
});

export const InnerMenuItemsList = ({
  children,
  depthLevel,
}: InnerMenuItemsListProps) => {
  return (
    <TransparencyBox
      sx={{
        top: -1 - transparentPaddingTop,
        left: listWidth - 1,
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
    </TransparencyBox>
  );
};

export const OuterMenuItemsList = ({ children }: { children: ReactNode }) => {
  return (
    <TransparencyBox>
      <StyledMenuItemsList
        sx={{
          left: 0,
          animation: 'fadeIn 0.2s',
        }}
      >
        {children}
      </StyledMenuItemsList>
    </TransparencyBox>
  );
};
