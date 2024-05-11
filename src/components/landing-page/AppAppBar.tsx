import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { SmartBar } from './SmartBar';
import { CategoriesPopover } from './CategoriesPopover';

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
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}
            >
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
              <CategoriesPopover />
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
