import { Box, Stack, Typography } from '@mui/material';
import { CourseDraft } from '../../features/courseDraftsSlice';
import { Star } from '../broad-courses-selection/Star';
import { formatDate, formatValue } from '../../utils/formatters';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

interface OverviewProps {
  courseDraft: CourseDraft;
}

export const Overview = ({ courseDraft }: OverviewProps) => {
  const ratings = courseDraft.ratings;
  const ratingCount = formatValue(ratings.length);
  const ratingSum = ratings.reduce((acc, { rating }) => acc + rating, 0);
  const ratingAverage =
    ratings.length > 0 ? (ratingSum / ratings.length).toFixed(1) : '0.0';
  const studentCount = formatValue(courseDraft.enrollments.length);
  const createdAt = formatDate(new Date(courseDraft.createdAt));

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          px: 4,
          gap: 4,
        }}
      >
        <Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography
              component={'div'}
              sx={{
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
              }}
            >
              {ratingAverage}{' '}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star fillAmount={1} iconSize={18} />
              </Box>
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography variant="caption">{ratingCount} ratings</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
              }}
            >
              {studentCount}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography variant="caption">Students</Typography>
          </Stack>
        </Stack>
        {/** What total is this? */}
        {/* <Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  0
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                }}
              >
                <Typography variant="caption">Total</Typography>
              </Stack>
            </Stack> */}
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></Box>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          px: 4,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pb: 0.2,
          }}
        >
          <EditCalendarIcon
            sx={{
              fontSize: 18,
            }}
          />
        </Box>
        <Typography variant="body2">Draft created on {createdAt}</Typography>
      </Stack>
    </Stack>
  );
};
