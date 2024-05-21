import { Box, Stack, Typography } from '@mui/material';
import { GreyscaleLogo } from '../trusted-by-companies-logos/GreyscaleLogo';
import { getTrustedCompanyLogos } from '../../../data/trustedCompaniesData';
import { EmptyStyledLink } from '../customer-stories/EmptyStyledLink';

export const FooterTopExtension = () => {
  const trustedCompanyLogos = getTrustedCompanyLogos().slice(0, 5);

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: (theme) => theme.palette.primary.contrastText,
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          Top companies choose{' '}
          <EmptyStyledLink
            href="/"
            sx={{
              color: (theme) => theme.palette.secondary.contrastText,
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            Lorem Business{' '}
          </EmptyStyledLink>
          to build in-demand career skills.
        </Typography>
      </Box>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
        }}
      >
        {trustedCompanyLogos.map((company, index) => (
          <GreyscaleLogo key={index} imageUrl={company.url} brightness={10} />
        ))}
      </Stack>
    </Stack>
  );
};
