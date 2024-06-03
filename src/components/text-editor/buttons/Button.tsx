import { ReactNode } from 'react';
import { Span } from '../styled/Span';

interface ButtonProps {
  isActive: boolean;
  children: ReactNode;
  onMouseDown: () => void;
}

export const Button = ({ isActive, children, onMouseDown }: ButtonProps) => {
  return (
    <Span
      onMouseDown={onMouseDown}
      sx={{
        cursor: 'pointer',
        color: isActive ? 'black' : 'rgba(0, 0, 0, 0.2)',
      }}
    >
      {children}
    </Span>
  );
};
