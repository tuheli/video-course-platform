import { Box, Paper, Stack, Typography } from '@mui/material';
import { Course } from '../../../data/courseData';
import { dateLocale } from './common';
import { BestSeller } from './BestSeller';
import { DotSeparatedSpan } from './DotSeparatedSpan';
import CheckIcon from '@mui/icons-material/Check';
import { AddToCartButtonSelector } from '../cart/AddToCartButtonSelector';
import { AddToFavoritesSelector } from '../favorites/AddToFavoritesSelector';
import { usePortaledItemContext } from '../../hooks/usePortaledItemContext';

interface CourseCardPopupContentProps {
  courseItem: Course;
}

// Height adjusts to content but width is fixed
const popupWidth = 300;
const defaultGap = 0.5;

const formatLastUpdatedDate = (date: Date) => {
  const month = date.toLocaleString(dateLocale, { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const CourseCardPopupContent = ({
  courseItem,
}: CourseCardPopupContentProps) => {
  const lastUpdatedDateString = formatLastUpdatedDate(
    new Date(courseItem.lastUpdated)
  );
  const { renderPosition } = usePortaledItemContext();

  return (
    <Box
      sx={{
        zIndex: 1,
        width: popupWidth,
        animation: 'fadeIn 0.2s',
      }}
    >
      <Stack
        sx={{
          flexDirection: renderPosition === 'below' ? 'column' : 'row',
        }}
      >
        <Paper>
          <Stack
            sx={{
              flexDirection: 'column',
              gap: defaultGap,
            }}
          >
            <Typography variant="h6">{courseItem.name}</Typography>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: defaultGap,
              }}
            >
              {courseItem.isBestseller && <BestSeller />}
              <Typography
                variant="caption"
                sx={{
                  color: 'text.green',
                }}
              >
                Updated {''}
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: 'text.green',
                    fontWeight: 500,
                  }}
                >
                  {lastUpdatedDateString}
                </Typography>
              </Typography>
            </Stack>
            <Box>
              <DotSeparatedSpan>
                {courseItem.lengthHours} hours
              </DotSeparatedSpan>
              <DotSeparatedSpan useDotSeparator={courseItem.hasSubtitles}>
                {courseItem.difficultyLevel}
              </DotSeparatedSpan>
              <DotSeparatedSpan useDotSeparator={false}>
                {courseItem.hasSubtitles && 'Subtitles'}
              </DotSeparatedSpan>
            </Box>
            <Stack
              sx={{
                flexDirection: 'column',
                gap: 0.8,
                mt: 0.5,
              }}
            >
              {courseItem.bulletPoints.map((text, index) => (
                <Stack
                  key={index}
                  sx={{
                    flexDirection: 'row',
                    gap: 2,
                  }}
                >
                  <CheckIcon />
                  <Typography variant="body2">{text}</Typography>
                </Stack>
              ))}
            </Stack>
            <Stack
              sx={{
                flexDirection: 'row',
              }}
            >
              {/* Increased z index because favorites buttons have scaling animations which might overlap add to cart buttons */}
              <Box
                sx={{
                  flexGrow: 1,
                  zIndex: 1,
                  mt: 0.5,
                }}
              >
                <AddToCartButtonSelector item={courseItem} />
              </Box>
              <AddToFavoritesSelector item={courseItem} />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};
