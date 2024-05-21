import { Box, Divider, Stack } from '@mui/material';
import { ColumnOrderedGrid } from '../column-ordered-grid/ColumnOrderedGrid';
import { getFooterLinks } from '../../../data/footerLinks';
import { FooterLink } from './FooterLink';
import { FooterSelectLanguageButton } from './FooterSelectLanguageButton';
import { CompanyLogo } from '../appbar/CompanyLogo';
import { Copyright } from './Copyright';
import { FooterTopExtension } from './FooterTopExtension';
import { useLocation } from 'react-router-dom';

// Logged in status affects if the top extension is shown

const isLoggedIn = false;

export const Footer = () => {
  const footerLinks = getFooterLinks();
  const footerLinkComponents = footerLinks.map(({ text }) => ({
    RenderComponent: () => <FooterLink text={text} />,
  }));

  const location = useLocation();

  const showTopExtension = !isLoggedIn && location.pathname !== '/';

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {showTopExtension && (
        <>
          <Box
            sx={{
              px: 4,
            }}
          >
            <FooterTopExtension />
          </Box>
          <Divider
            sx={{
              borderColor: 'grey.800',
            }}
          />
        </>
      )}
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
          px: 4,
        }}
      >
        <ColumnOrderedGrid
          stackHeight={5}
          items={footerLinkComponents}
          gap={2}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <FooterSelectLanguageButton />
        </Box>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          px: 4,
          pt: 4,
        }}
      >
        <CompanyLogo isWhite={true} />
        <Box>
          <Copyright />
        </Box>
      </Stack>
    </Stack>
  );
};
