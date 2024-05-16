import { Typography } from '@mui/material';

interface DetailSpanProps {
  children: React.ReactNode;
  useDotSeparator?: boolean;
}

export const DotSeparatedSpan = ({
  children,
  useDotSeparator = true,
}: DetailSpanProps) => {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: 11,
        color: 'text.secondary',
        '&::after': {
          content: useDotSeparator ? "'•'" : undefined,
          margin: '0 0.5em',
        },
      }}
    >
      {children}
    </Typography>
  );
};
