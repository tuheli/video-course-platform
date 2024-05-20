import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { LearnerPositiveReview } from '../../../data/reviewsData';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { StyledLink } from './StyledLink';
import { useState } from 'react';
import { secondary } from '../../theme';
import { LineClampedTypography } from '../broad-courses-selection/LineClampedTypography';
import { QuoteImage } from './QuoteImage';

interface PositiveReviewCardProps {
  positiveReview: LearnerPositiveReview;
}

const iconSize = 28;
const minHeight = 300;
const maxWidth = 340;

const columGap = 2;
const rowGap = 0.5;

export const PositiveReviewCard = ({
  positiveReview,
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
        <QuoteImage />
        <Typography
          variant="body2"
          sx={{
            minHeight: 80,
          }}
        >
          {positiveReview.reviewText}
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
              {positiveReview.firstName[0]}
              {positiveReview.lastNameLetter}
            </Avatar>
          </Box>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          >
            {positiveReview.firstName} {positiveReview.lastNameLetter}
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
              {positiveReview.courseName}
            </LineClampedTypography>
          </Stack>
        </StyledLink>
      </Stack>
    </Paper>
  );
};
