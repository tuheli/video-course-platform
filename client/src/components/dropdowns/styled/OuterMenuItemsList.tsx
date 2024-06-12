import { ReactNode } from 'react';
import { StyledTransparencyBox } from './StyledTransparencyBox';
import { StyledMenuItemsList } from './StyledMenuItemsList';
import { listWidth } from './common';

export const OuterMenuItemsList = ({ children }: { children: ReactNode }) => {
  return (
    <StyledTransparencyBox
      sx={{
        left: 0,
        width: listWidth,
      }}
    >
      <StyledMenuItemsList
        sx={{
          left: 0,
          animation: 'fadeIn 0.2s',
        }}
      >
        {children}
      </StyledMenuItemsList>
    </StyledTransparencyBox>
  );
};
