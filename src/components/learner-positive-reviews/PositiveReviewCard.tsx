import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { LearnerPositiveReview } from './learnerPositiveReviewsData';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { StyledLink } from './StyledLink';
import { useState } from 'react';
import { secondary } from '../../theme';
import { LineClampedTypography } from '../broad-courses-selection/LineClampedTypography';

interface PositiveReviewCardProps {
  courseTitle: string;
  review: LearnerPositiveReview;
}

const quoteSvgSize = 20;
const iconSize = 28;
const minHeight = 300;
const maxWidth = 340;

const columGap = 2;
const rowGap = 0.5;

export const PositiveReviewCard = ({
  courseTitle,
  review,
}: PositiveReviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnterLink = () => {
    setIsHovered(true);
  };

  const onMouseLeaveLink = () => {
    setIsHovered(false);
  };

  const onClickLink = () => {};

  return (
    <Paper
      sx={{
        marginRight: 2,
        padding: 2,
        maxWidth,
        minHeight,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          gap: columGap,
          alignItems: 'left',
        }}
      >
        <Box>
          <Box
            component="img"
            src="/learner-positive-reviews/quote.svg"
            sx={{
              width: quoteSvgSize,
              height: quoteSvgSize,
            }}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            minHeight: 80,
          }}
        >
          {review.reviewText}
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: rowGap,
          }}
        >
          <Box>
            <Avatar
              sx={{
                width: iconSize,
                height: iconSize,
                fontSize: '0.75rem',
              }}
            >
              {review.firstName[0]}
              {review.lastNameLetter}
            </Avatar>
          </Box>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          >
            {review.firstName} {review.lastNameLetter}
          </Typography>
        </Stack>
        <Divider />
        <StyledLink>
          <Stack
            onMouseEnter={onMouseEnterLink}
            onMouseLeave={onMouseLeaveLink}
            onClick={onClickLink}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: rowGap,
            }}
          >
            <PlayCircleIcon
              sx={{
                width: iconSize,
                height: iconSize,
                color: isHovered ? secondary[900] : secondary[800],
              }}
            />
            <LineClampedTypography
              maxLines={2}
              variant="body2"
              sx={{
                fontWeight: 500,
                color: isHovered ? secondary[900] : secondary[800],
              }}
            >
              {courseTitle}
            </LineClampedTypography>
          </Stack>
        </StyledLink>
      </Stack>
    </Paper>
  );
};
