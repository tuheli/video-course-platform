import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { RedeemOfferCallToAction } from './RedeemOfferCallToAction';

const SmartBar = () => {
  return <RedeemOfferCallToAction />;
};

const AppAppBar = () => {
  return (
    <AppBar>
      <Stack
        sx={{
          flexDirection: 'column',
        }}
      >
        <SmartBar />
        <Toolbar>
          {/** Outer stack */}
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            {/** Left side items */}
            <Stack>
              <a href="/">
                <Box
                  component="img"
                  src="/logoipsum-317.svg"
                  sx={{
                    maxHeight: '1.3rem',
                    cursor: 'pointer',
                  }}
                ></Box>
              </a>
            </Stack>
            {/** Middle seach bar */}
          </Stack>
          {/** Right side items */}
          <Stack></Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default AppAppBar;
