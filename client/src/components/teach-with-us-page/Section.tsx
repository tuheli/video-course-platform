import { Box, Stack, Typography } from '@mui/material';

export interface Section {
  heading: string;
  description: {
    firstParagraph: string;
    secondParagraph: string;
  };
  howWeHelp: string;
  imageUrl: string;
}
interface SectionProps {
  section: Section;
}

export const Section = ({ section }: SectionProps) => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        maxHeight: 400,
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          width: '50%',
          pl: 24,
          pr: 8,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography>{section.description.firstParagraph}</Typography>
          <Typography>{section.description.secondParagraph}</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              mt: 1,
            }}
          >
            How we help you
          </Typography>
          <Typography
            sx={{
              mt: 1,
            }}
          >
            {section.howWeHelp}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          width: '50%',
          pr: 20,
        }}
      >
        <img
          src={section.imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Stack>
  );
};
