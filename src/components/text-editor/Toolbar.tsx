import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface ToolbarProps {
  children: ReactNode;
}

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <Stack
      sx={{
        position: 'relative',
        flexDirection: 'row',
        gap: 2,
        p: 1,
      }}
    >
      {children}
    </Stack>
  );
};
