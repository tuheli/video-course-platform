import { SxProps, Typography, TypographyOwnProps } from '@mui/material';

interface LineClampedTypographyProps {
  children: React.ReactNode;
  maxLines: number;
  sx?: SxProps;
  variant?: TypographyOwnProps['variant'];
}

export const LineClampedTypography = ({
  children,
  maxLines,
  variant,
  sx,
}: LineClampedTypographyProps) => {
  return (
    <Typography
      variant={variant}
      sx={{
        ...sx,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLines,
      }}
    >
      {children}
    </Typography>
  );
};
