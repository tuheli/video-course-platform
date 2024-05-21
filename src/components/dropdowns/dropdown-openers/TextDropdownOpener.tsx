import { SxProps, Theme, Typography } from '@mui/material';
import { MainDropdownOpener } from './MainDropdownOpener';
import { useDropdownContext } from '../../../hooks/useDropdownContext';

interface TextComponentProps {
  text: string;
  sx?: SxProps<Theme> | undefined;
}

interface TextDropdownOpenerProps {
  text: string;
  children: React.ReactNode;
  linkTo: string;
}

const RenderComponent = ({ text, sx }: TextComponentProps) => {
  const { isDropdownOpen } = useDropdownContext();

  return (
    <Typography
      variant="body2"
      sx={{
        ...sx,
        color: isDropdownOpen ? 'secondary.main' : 'text.primary',
      }}
    >
      {text}
    </Typography>
  );
};

export const TextDropdownOpener = ({
  text,
  children,
  linkTo,
}: TextDropdownOpenerProps) => {
  return (
    <MainDropdownOpener
      RenderComponent={({ sx }: { sx?: SxProps<Theme> | undefined }) =>
        RenderComponent({ text, sx })
      }
      forceOpen={false}
      usePortal={false}
      linkTo={linkTo}
    >
      {children}
    </MainDropdownOpener>
  );
};
