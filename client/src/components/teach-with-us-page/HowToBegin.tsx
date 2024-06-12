import { Box, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { SelectButtons } from './SelectButtons';
import { Section } from './Section';
import { sections } from './sections';

export const HowToBegin = () => {
  const [sectionToShow, setSectionToShow] = useState(sections[0].heading);

  const section = sections.find((section) => section.heading === sectionToShow);

  if (!section) return null;

  return (
    <Container>
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Typography variant="h4">How to begin</Typography>
        </Box>
        <SelectButtons
          sections={sections}
          sectionToShow={sectionToShow}
          setSectionToShow={setSectionToShow}
        />
        <Section section={section} />
      </Stack>
    </Container>
  );
};
