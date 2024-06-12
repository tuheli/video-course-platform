import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface StarProps {
  fillAmount: number;
  iconSize: number;
}

const starColor = 'rgb(180, 105, 14)';

export const Star = ({ fillAmount, iconSize }: StarProps) => {
  if (fillAmount < 0.2) {
    return (
      <StarBorderIcon
        sx={{
          color: starColor,
          width: iconSize,
          height: iconSize,
        }}
      />
    );
  }

  if (fillAmount >= 0.2 && fillAmount <= 0.7) {
    return (
      <StarHalfIcon
        sx={{
          color: starColor,
          width: iconSize,
          height: iconSize,
        }}
      />
    );
  }

  return (
    <StarIcon
      sx={{
        color: starColor,
        width: iconSize,
        height: iconSize,
      }}
    />
  );
};
