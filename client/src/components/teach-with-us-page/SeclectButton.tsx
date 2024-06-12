import { Button, Typography } from '@mui/material';
import { Section } from './Section';

interface SelectButtonProps {
  section: Section;
  isActive: boolean;
  setSectionToShow: (section: string) => void;
}
export const SeclectButton = ({
  section,
  isActive,
  setSectionToShow,
}: SelectButtonProps) => {
  return (
    <Button
      variant="text"
      sx={{
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: isActive ? 'text.primary' : 'divider',
        transition: 'none',
        '&:hover': {
          color: isActive ? 'text.primary' : 'text.secondary',
        },
      }}
      onClick={() => setSectionToShow(section.heading)}
    >
      <Typography
        sx={{
          fontWeight: 500,
        }}
      >
        {section.heading}
      </Typography>
    </Button>
  );
};
