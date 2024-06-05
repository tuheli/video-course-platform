import { Box, SxProps } from '@mui/material';
import { useDraggableContext } from '../../hooks/useDraggableContext';
import MenuIcon from '@mui/icons-material/Menu';

interface DraghandleProps {
  sx?: SxProps;
}

// NOTE: Technically draggables can be dragged
// from anywhere but this is a visual indicator

export const Draghandle = ({ sx }: DraghandleProps) => {
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
      style={{
        cursor: 'ns-resize',
      }}
    >
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'text.primary',
          borderLeft: 'none',
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
