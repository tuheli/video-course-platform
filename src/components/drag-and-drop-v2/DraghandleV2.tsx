import MenuIcon from '@mui/icons-material/Menu';
import { memo } from 'react';

interface DraghandleProps {
  style?: React.CSSProperties;
}

const DraghandleV2 = ({ style }: DraghandleProps) => {
  return (
    <div
      className="draghandle"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'move',
        ...style,
      }}
    >
      <MenuIcon
        sx={{
          fontSize: 18,
        }}
      />
    </div>
  );
};

export default memo(DraghandleV2);
