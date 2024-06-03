import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface ToolbarProps {
  children: ReactNode;
}

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
};
