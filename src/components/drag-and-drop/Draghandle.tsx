import { Box } from '@mui/material';
import { useDraggableContext } from '../../hooks/useDraggableContext';
import MenuIcon from '@mui/icons-material/Menu';

export const Draghandle = () => {
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
          width: 54,
          height: 54,
          bgcolor: 'orange',
          border: '1px solid',
          borderColor: 'text.primary',
          borderLeft: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MenuIcon />
      </Box>
    </div>
  );
};
