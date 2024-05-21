import { AppBar, Stack, Toolbar } from '@mui/material';
import { SmartBar } from './smartbar/SmartBar';
import { CategoriesDropdown } from '../dropdowns/dropdown-multi-level/CategoriesDropdown';
import { SearchBar } from './searchbar/SearchBar';
import { BusinessDropdown } from '../dropdowns/dropdown-singe-item/BusinessDropdown';
import { TeachDropdown } from '../dropdowns/dropdown-singe-item/TeachDropdown';
import { CartDropdown } from '../cart/CartDropdown';
import { LoginButton } from './LoginButton';
import { SignUpButton } from './SignUpButton';
import { OpenLanguageModalButton } from '../language-selection/OpenLanguageModalButton';
import { CompanyLogo } from './CompanyLogo';

const itemGap = 2;

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
          <Stack
            sx={{
              bgcolor: 'white',
              flexGrow: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: itemGap,
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: itemGap,
              }}
            >
              <CompanyLogo />
              <CategoriesDropdown />
            </Stack>
            <SearchBar />
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: itemGap,
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
                gap: itemGap,
              }}
            >
              <LoginButton />
              <SignUpButton />
              <OpenLanguageModalButton />
            </Stack>
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default AppAppBar;
