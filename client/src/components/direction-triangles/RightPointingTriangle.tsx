import { Box } from '@mui/material';
import { triangleColor, triangleHeight, triangleWidth } from './common';

export const RightPointingTriangle = () => {
  return (
    <Box
      sx={{
        alignContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 0,
          height: 0,
          borderTop: `${triangleWidth}px solid transparent`,
          borderBottom: `${triangleWidth}px solid transparent`,
          borderLeft: `${triangleHeight}px solid ${triangleColor}`,
        }}
      />
    </Box>
  );
};
