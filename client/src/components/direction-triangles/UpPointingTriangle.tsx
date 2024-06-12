import { Box } from '@mui/material';
import { triangleColor, triangleHeight, triangleWidth } from './common';

export const UpPointingTriangle = () => {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: 0,
          height: 0,
          borderLeft: `${triangleWidth}px solid transparent`,
          borderRight: `${triangleWidth}px solid transparent`,
          borderBottom: `${triangleHeight}px solid ${triangleColor}`,
        }}
      />
    </Box>
  );
};
