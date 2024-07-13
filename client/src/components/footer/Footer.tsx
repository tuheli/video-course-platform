import { Box, Divider, Stack, styled, Typography } from '@mui/material';
import { ColumnOrderedGrid } from '../column-ordered-grid/ColumnOrderedGrid';
import { getFooterLinks } from '../../../data/footerLinks';
import { FooterLink } from './FooterLink';
import { FooterSelectLanguageButton } from './FooterSelectLanguageButton';
import { CompanyLogo } from '../appbar/CompanyLogo';
import { Copyright } from './Copyright';
import { FooterTopExtension } from './FooterTopExtension';
import { Link, useLocation } from 'react-router-dom';

const EmptyStyledLink = styled(Link)({});

export const Footer = () => {
  const footerLinks = getFooterLinks();
  const components = footerLinks.map(({ text }) => {
    const isDemovideo = text === 'About us';

    if (isDemovideo) {
      return {
        RenderComponent: () => (
          <EmptyStyledLink
            to={'/topsecretdemovideo'}
            sx={{
              color: (theme) => theme.palette.primary.contrastText,
              textDecoration: 'none',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <Box
              sx={{
                py: 0.1,
                width: 180,
                '&:hover': {
                  cursor: 'pointer',
                  animation: 'shake 1s ease-in-out infinite',
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 400,
                }}
              >
                {text}
              </Typography>
            </Box>
          </EmptyStyledLink>
        ),
      };
    }

    return {
      RenderComponent: () => <FooterLink text={text} />,
    };
  });

  const location = useLocation();
  const showTopExtension =
    location.pathname !== '/' && location.pathname !== '/teaching';

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
        <ColumnOrderedGrid stackHeight={5} items={components} gap={2} />
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
