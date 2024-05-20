import { Box, Container, Stack } from '@mui/material';
import { ColumnOrderedGrid } from '../column-ordered-grid/ColumnOrderedGrid';
import { getFooterLinks } from '../../../data/footerLinks';
import { FooterLink } from './FooterLink';
import { FooterSelectLanguageButton } from './FooterSelectLanguageButton';
import { CompanyLogo } from '../appbar/CompanyLogo';
import { Copyright } from './Copyright';

export const Footer = () => {
  const footerLinks = getFooterLinks();
  const footerLinkComponents = footerLinks.map(({ text }) => ({
    RenderComponent: () => <FooterLink text={text} />,
  }));

  return (
    <Container maxWidth={false}>
      <Stack
        sx={{
          flexDirection: 'column',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 2,
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
            py: 8,
          }}
        >
          <CompanyLogo isWhite={true} />
          <Box>
            <Copyright />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
