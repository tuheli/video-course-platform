import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trustedByCompanyLogos } from './trustedByCompanyLogosData';
import { Box, Container, Stack, Typography } from '@mui/material';
import { GreyscaleLogo } from './GreyscaleLogo';

export const TrustedByCompaniesLogos = () => {
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
            {trustedByCompanyLogos.map((company) => (
              <Grid2 key={company.id}>
                <GreyscaleLogo url={company.url} />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </Container>
    </Box>
  );
};
