import { useDraggableContext } from '../../hooks/useDraggableContext';
import MenuIcon from '@mui/icons-material/Menu';

interface DraghandleProps {
  fontSize?: number;
  style: React.CSSProperties;
}

// NOTE: Technically draggables can be dragged
// from anywhere but this is a visual indicator

export const Draghandle = ({ fontSize, style }: DraghandleProps) => {
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
        border: '1px solid',
        borderColor: 'text.primary',
        borderLeft: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <MenuIcon
        sx={{
          fontSize,
        }}
      />
    </div>
  );
};
