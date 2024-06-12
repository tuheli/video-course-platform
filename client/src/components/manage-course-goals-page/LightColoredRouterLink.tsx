import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledRouterLink = styled(Link)(() => ({}));

interface LightColoredRouterLinkProps {
  to: string;
  children: string;
}

export const LightColoredRouterLink = ({
  to,
  children,
}: LightColoredRouterLinkProps) => {
  return (
    <StyledRouterLink
      to={to}
      sx={{
        color: 'secondary.light',
        textUnderlineOffset: 4,
      }}
    >
      {children}
    </StyledRouterLink>
  );
};
