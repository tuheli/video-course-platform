import { Box, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CreateAnEngagingCourseSection } from '../../../data/createAnEngagingCourseData';

export interface SectionProps {
  section: CreateAnEngagingCourseSection;
  isWide: boolean;
}

export const Section = ({ section, isWide }: SectionProps) => {
  return (
    <Paper>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 220,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '40%',
            maxHeight: 200,
            maxWidth: 200,
            overflow: 'hidden',
          }}
        >
          <img
            src={section.imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Stack
          sx={{
            flexDirection: 'column',
            width: '60%',
            gap: 2,
            justifyContent: 'center',
            pr: 8,
          }}
        >
          <Typography
            sx={{
              fontSize: isWide ? 24 : 20,
            }}
          >
            {section.title}
          </Typography>
          <Typography>{section.description}</Typography>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              sx={{
                color: 'secondary.light',
                textDecoration: 'underline',
                textDecorationThickness: 2,
                textUnderlineOffset: 4,
              }}
            >
              Get Started
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
};
