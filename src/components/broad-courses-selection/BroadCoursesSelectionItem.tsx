import { type CourseItem } from './broadCoursesSelectionData';
import { Box, Stack, Typography } from '@mui/material';
import { LineClampedTypography } from './LineClampedTypography';
import { StarRating } from './StarRating';
import { DiscountedPrice } from './DiscountedPrice';
import { significantDigitFormatter } from './numberFormatters';
import { NormalPrice } from './NormalPrice';
import { courseCardWidth } from './common';

interface BroadCoursesSelectionItemProps {
  courseItem: CourseItem;
  isHovered: boolean | undefined;
}

export const BroadCoursesSelectionItem = ({
  courseItem,
  isHovered,
}: BroadCoursesSelectionItemProps) => {
  const formattedRatingCount = significantDigitFormatter.format(
    courseItem.ratingCount
  );
  const isDiscounted = courseItem.priceEur < courseItem.listPrice;

  return (
    <Box
      sx={{
        width: courseCardWidth,
        bgcolor: 'green',
      }}
    >
      <img
        src={courseItem.thumbnailUrl}
        alt="Course image"
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '100%',
          filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
          transition: 'filter 0.2s ease-in-out',
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
        <Box
          sx={{
            height: 28,
            mt: 1,
          }}
        >
          {courseItem.isBestseller && (
            <Typography
              sx={{
                display: 'inline-block',
                backgroundColor: 'background.secondary',
                fontSize: 11,
                fontWeight: 600,
                p: 0.5,
              }}
            >
              Bestseller
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
