import { SvgIconTypeMap, SxProps, Theme } from '@mui/material';
import { MainDropdownOpener } from './MainDropdownOpener';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface IconComponentProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  sx?: SxProps<Theme> | undefined;
}

interface IconDropdownOpenerProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  children: React.ReactNode;
}

const RenderComponent = ({ Icon, sx }: IconComponentProps) => {
  return <Icon sx={sx} />;
};

export const IconDropdownOpener = ({
  Icon,
  children,
}: IconDropdownOpenerProps) => {
  return (
    <MainDropdownOpener
      RenderComponent={({ sx }: { sx?: SxProps<Theme> | undefined }) =>
        RenderComponent({ Icon, sx })
      }
      sx={{
        padding: 2,
      }}
    >
      {children}
    </MainDropdownOpener>
  );
};
