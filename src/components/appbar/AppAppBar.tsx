import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { SmartBar } from './smartbar/SmartBar';
import { CategoriesDropdown } from '../dropdowns/dropdown-multi-level/CategoriesDropdown';
import { SearchBar } from './searchbar/SearchBar';
import { BusinessDropdownButton } from '../dropdowns/dropdown-button/BusinessDropdownButton';
import { TeachDropdownButton } from '../dropdowns/dropdown-button/TeachDropdownButton';

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
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <BusinessDropdownButton />
              <TeachDropdownButton />
            </Stack>
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default AppAppBar;
