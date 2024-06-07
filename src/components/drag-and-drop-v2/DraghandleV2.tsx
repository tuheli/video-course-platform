import { Box, SxProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDraggableContext } from './useDraggableContext';

interface DraghandleProps {
  sx?: SxProps;
}

export const DraghandleV2 = ({ sx }: DraghandleProps) => {
  const { setIsDraggable } = useDraggableContext();

  const onMouseEnter = () => {
    setIsDraggable(true);
  };

  const onMouseLeave = () => {
    setIsDraggable(false);
  };

  return (
    <div
      className="draghandle"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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
