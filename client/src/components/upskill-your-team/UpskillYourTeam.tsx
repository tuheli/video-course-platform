import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { CompanyLogo } from '../appbar/CompanyLogo';
import { StyledList } from './StyledList';
import { StyledListItem } from './StyledListItem';

const itemWidth = 360;

export const UpskillYourTeam = () => {
  const onClickGetLoremBusiness = () => {};
  const onClickLearnMore = () => {};

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            gap: 2,
            width: itemWidth,
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                alignSelf: 'end',
              }}
            >
              <CompanyLogo />
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: 'secondary.light',
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1,
              }}
            >
              business
            </Typography>
          </Stack>
          <Typography
            variant="h4"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              fontSize: 28,
            }}
          >
            Upskill your team with Lorem Business
          </Typography>
          <StyledList>
            <StyledListItem>
              Unlimited access to 25,000+ top Lorem courses, anytime, anywhere
            </StyledListItem>
            <StyledListItem>
              International course collection in 14 languages
            </StyledListItem>
            <StyledListItem>
              Top certifications in tech and business
            </StyledListItem>
          </StyledList>
          <Stack
            sx={{
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={onClickGetLoremBusiness}
            >
              Get Lorem Business
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClickLearnMore}
            >
              Learn more
            </Button>
          </Stack>
        </Stack>
        <Box
          component="img"
          src="/promo-images/lorem-business-promo-800x800.jpg"
          width={itemWidth}
        />
      </Stack>
    </Container>
  );
};
