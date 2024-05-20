import { Box } from '@mui/material';

const size = 16;

export const QuoteImage = () => {
  return (
    <Box>
      <Box
        component="img"
        src="/learner-positive-reviews/quote.svg"
        sx={{
          width: size,
          height: size,
        }}
      />
    </Box>
  );
};
