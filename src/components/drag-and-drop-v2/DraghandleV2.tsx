import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { memo } from 'react';

interface DraghandleProps {}

const DraghandleV2 = ({}: DraghandleProps) => {
  return (
    <div className="draghandle">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MenuIcon
          sx={{
            fontSize: 18,
          }}
        />
      </Box>
    </div>
  );
};

export default memo(DraghandleV2);
