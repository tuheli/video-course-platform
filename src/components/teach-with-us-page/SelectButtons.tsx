import { Box, Stack } from '@mui/material';
import { Section } from './Section';
import { SeclectButton } from './SeclectButton';

interface SelectButtonsProps {
  sections: Section[];
  sectionToShow: string;
  setSectionToShow: (section: string) => void;
}

export const SelectButtons = ({
  sections,
  sectionToShow,
  setSectionToShow,
}: SelectButtonsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {sections.map((section, index) => (
            <SeclectButton
              key={index}
              section={section}
              isActive={section.heading === sectionToShow}
              setSectionToShow={setSectionToShow}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
