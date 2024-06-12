import { Paper, Stack, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Step1ItemProps {
  heading: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const Step1Item = ({
  heading,
  description,
  Icon,
  isSelected,
  onClick,
}: Step1ItemProps) => {
  return (
    <Paper
      component={'button'}
      sx={{
        py: 4,
        px: 1,
        borderRadius: 0,
        outline: isSelected ? '4px solid' : 'none',
        outlineColor: 'text.primary',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={onClick}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          width: 240,
          height: 280,
        }}
      >
        <Icon
          sx={{
            fontSize: 48,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          {heading}
        </Typography>
        <Typography
          sx={{
            maxWidth: '80%',
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Paper>
  );
};
