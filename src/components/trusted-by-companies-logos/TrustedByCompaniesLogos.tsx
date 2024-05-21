import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Container, Stack, Typography } from '@mui/material';
import { GreyscaleLogo } from './GreyscaleLogo';
import { getTrustedCompanyLogos } from '../../../data/trustedCompaniesData';

export const TrustedByCompaniesLogos = () => {
  const trustedCompanyLogos = getTrustedCompanyLogos();

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: 8,
      }}
    >
      <Container>
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
            }}
          >
            Trusted by over 15,000 companies and millions of learners around the
            world
          </Typography>
          <Grid2
            container
            sx={{
              gap: 2,
              justifyContent: 'space-between',
            }}
          >
            {trustedCompanyLogos.map((company) => (
              <Grid2 key={company.id}>
                <GreyscaleLogo imageUrl={company.url} />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </Container>
    </Box>
  );
};
