import { Box, SxProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { memo } from 'react';

interface DraghandleProps {
  sx?: SxProps;
}

const DraghandleV2 = ({ sx }: DraghandleProps) => {
  return (
    <div className="draghandle">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
      >
        <MenuIcon />
      </Box>
    </div>
  );
};

export default memo(DraghandleV2);
