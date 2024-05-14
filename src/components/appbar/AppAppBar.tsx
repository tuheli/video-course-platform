import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { SmartBar } from './smartbar/SmartBar';
import { CategoriesDropdown } from '../dropdowns/dropdown-multi-level/CategoriesDropdown';
import { SearchBar } from './searchbar/SearchBar';
import { BusinessDropdown } from '../dropdowns/dropdown-singe-item/BusinessDropdown';
import { TeachDropdown } from '../dropdowns/dropdown-singe-item/TeachDropdown';
import { CartDropdown } from '../dropdowns/dropdown-singe-item/CartDropdown';
import { LoginButton } from './LoginButton';
import { SignUpButton } from './SignUpButton';
import { SelectLanguageButton } from './SelectLanguageButton';
import { CompanyLogo } from './CompanyLogo';

const AppAppBar = () => {
  return (
    <AppBar
      sx={{
        position: 'static',
        bgcolor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 0,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
        }}
      >
        <SmartBar />
        <Toolbar>
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
              <CompanyLogo />
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
              <BusinessDropdown />
              <TeachDropdown />
              <CartDropdown />
            </Stack>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <LoginButton />
              <SignUpButton />
              <SelectLanguageButton />
            </Stack>
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default AppAppBar;
