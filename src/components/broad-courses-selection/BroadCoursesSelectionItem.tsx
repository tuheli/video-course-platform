import { type CourseItem } from './broadCoursesSelectionData';
import { Box, Stack, Typography } from '@mui/material';
import { LineClampedTypography } from './LineClampedTypography';
import { StarRating } from './StarRating';
import { DiscountedPrice } from './DiscountedPrice';
import { significantDigitFormatter } from './numberFormatters';
import { NormalPrice } from './NormalPrice';

interface BroadCoursesSelectionItemProps {
  courseItem: CourseItem;
}

export const BroadCoursesSelectionItem = ({
  courseItem,
}: BroadCoursesSelectionItemProps) => {
  const formattedRatingCount = significantDigitFormatter.format(
    courseItem.ratingCount
  );
  const isDiscounted = courseItem.priceEur < courseItem.listPrice;

  return (
    <Box
      sx={{
        width: 200,
      }}
    >
      <img
        src={courseItem.thumbnailUrl}
        alt="Course image"
        style={{
          objectFit: 'contain',
          width: '100%',
          height: 'auto',
          border: '1px solid #e0e0e0',
        }}
      />
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 0.2,
        }}
      >
        <LineClampedTypography
          variant="body2"
          maxLines={2}
          sx={{
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {courseItem.title}
        </LineClampedTypography>
        <LineClampedTypography
          maxLines={1}
          variant="caption"
          sx={{
            fontSize: 10,
          }}
        >
          {courseItem.creatorNames.join(', ')}
        </LineClampedTypography>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {courseItem.rating.toFixed(1)}
          </Typography>
          <StarRating rating={courseItem.rating} starSize={14} />
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            ({formattedRatingCount})
          </Typography>
        </Stack>
        {isDiscounted ? (
          <DiscountedPrice
            price={courseItem.priceEur}
            listPrice={courseItem.listPrice}
          />
        ) : (
          <NormalPrice price={courseItem.priceEur} />
        )}
      </Stack>
    </Box>
  );
};
