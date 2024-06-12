import { Box } from '@mui/material';
import { triangleHeight, triangleWidth } from './common';

// NOTE: Not yet for use. The svg triangles are not sharp and dont look good.

export const SVGTriangleLeft = () => {
  return (
    <div>
      <div
        style={{
          width: triangleWidth,
          height: triangleHeight,
          backgroundColor: 'magenta',
          clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
        }}
      />
    </div>
  );
};

export const SVGTriangleRight = () => {
  return (
    <div>
      <div
        style={{
          width: triangleWidth,
          height: triangleHeight,
          backgroundColor: 'magenta',
          clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
        }}
      />
    </div>
  );
};

export const SVGTriangleUp = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'red',
        justifyContent: 'center',
      }}
    >
      <svg
        style={{
          height: triangleHeight,
          width: triangleWidth,
          backgroundColor: 'white',
        }}
      >
        <polygon
          points={`${0 + 2} ${triangleHeight}, ${triangleWidth / 2} ${2}, ${triangleWidth - 2} ${triangleHeight}`}
          style={{
            width: triangleWidth,
            height: triangleHeight,
            stroke: 'black',
            strokeWidth: 1,
            fill: 'transparent',
          }}
        />
      </svg>
    </Box>
  );
};
