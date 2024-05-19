import { Box, Stack } from '@mui/material';
import { AddableToCart } from '../../features/cartSlice';
import { LineClampedTypography } from '../broad-courses-selection/LineClampedTypography';
import { DiscountedPrice } from '../broad-courses-selection/DiscountedPrice';
import { NormalPrice } from '../broad-courses-selection/NormalPrice';

interface CartPreviewItemProps {
  courseItem: AddableToCart;
}
const imageSize = 62;

export const CartPreviewItem = ({ courseItem }: CartPreviewItemProps) => {
  const isDiscounted = courseItem.priceEur < courseItem.listPrice;

  return (
    <Stack
      direction="row"
      sx={{
        gap: 2,
      }}
    >
      <Box
        component="img"
        src={courseItem.thumbnailUrl}
        alt="Course image"
        sx={{
          objectFit: 'cover',
          width: imageSize,
          height: imageSize,
        }}
      />
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 0.3,
        }}
      >
        <LineClampedTypography
          maxLines={2}
          sx={{
            color: 'text.primary',
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {courseItem.name}
        </LineClampedTypography>
        <LineClampedTypography
          maxLines={1}
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: 10,
          }}
        >
          {courseItem.creatorNames.join(', ')}
        </LineClampedTypography>
        {isDiscounted ? (
          <DiscountedPrice
            price={courseItem.priceEur}
            listPrice={courseItem.listPrice}
          />
        ) : (
          <NormalPrice price={courseItem.priceEur} />
        )}
      </Stack>
    </Stack>
  );
};
