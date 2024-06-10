import MenuIcon from '@mui/icons-material/Menu';
import { Box, SxProps } from '@mui/material';
import { memo } from 'react';

interface DraghandleProps {
  sx?: SxProps;
}

const Draghandle = ({ sx }: DraghandleProps) => {
  return (
    <Box
      className="draghandle"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'move',
        ...sx,
      }}
    >
      <MenuIcon
        sx={{
          fontSize: 18,
        }}
      />
    </Box>
  );
};

export default memo(Draghandle);
