import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import { SmartBar } from './SmartBar';
import { CategoriesDropdown } from '../multi-level-dropdown/CategoriesDropdown';
import { SearchBar } from '../searchbar/SearchBar';

const AppAppBar = () => {
  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
        }}
      >
        <SmartBar />
        <Toolbar
          sx={{
            bgcolor: 'green',
          }}
        >
          {/** Stack to control gaps between left mid and right sections */}
          <Stack
            sx={{
              bgcolor: 'white',
              flexGrow: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
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
              <a
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src="/logoipsum-317.svg"
                  sx={{
                    maxHeight: '1.3rem',
                    cursor: 'pointer',
                  }}
                ></Box>
              </a>
              <CategoriesDropdown />
            </Stack>
            {/** Middle seach bar */}
            <SearchBar />
            {/** Right side items */}
            <Stack></Stack>
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default AppAppBar;
