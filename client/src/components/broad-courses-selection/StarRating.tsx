import { Stack } from '@mui/material';
import { Star } from './Star';

interface StarRatingProps {
  rating: number;
  starSize: number;
}

export const StarRating = ({ rating, starSize }: StarRatingProps) => {
  const maxStars = 5;
  const starComponents = [];

  for (let i = 0; i < maxStars; i++) {
    const fillAmount = rating - i;
    starComponents.push(
      <Star key={i} fillAmount={fillAmount} iconSize={starSize} />
    );
  }

  return (
    <Stack
      sx={{
        flexDirection: 'row',
      }}
    >
      {starComponents}
    </Stack>
  );
};
