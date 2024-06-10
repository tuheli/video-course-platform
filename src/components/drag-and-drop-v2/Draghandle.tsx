import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import { memo } from 'react';

interface DraghandleProps {
  sx?: React.CSSProperties;
}

const Draghandle = ({ sx }: DraghandleProps) => {
  return (
    <Box
      className="draghandle"
      style={{
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
