import { SxProps, Theme, Typography } from '@mui/material';
import { MainDropdownOpener } from './MainDropdownOpener';

interface TextComponentProps {
  text: string;
  sx?: SxProps<Theme> | undefined;
}

interface TextDropdownOpenerProps {
  text: string;
  children: React.ReactNode;
}

const RenderComponent = ({ text, sx }: TextComponentProps) => {
  return (
    <Typography variant="body2" sx={sx}>
      {text}
    </Typography>
  );
};

export const TextDropdownOpener = ({
  text,
  children,
}: TextDropdownOpenerProps) => {
  return (
    <MainDropdownOpener
      RenderComponent={({ sx }: { sx?: SxProps<Theme> | undefined }) =>
        RenderComponent({ text, sx })
      }
    >
      {children}
    </MainDropdownOpener>
  );
};
