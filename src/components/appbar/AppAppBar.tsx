import { AppBar, Stack, Toolbar } from '@mui/material';
import { SmartBar } from './smartbar/SmartBar';
import { CategoriesDropdownOpener } from '../dropdowns/dropdown-multi-level/categories-dropdown/CategoriesDropdownOpener';
import { SearchBar } from './searchbar/SearchBar';
import { BusinessDropdown } from '../dropdowns/dropdown-singe-item/lorem-business-dropdown/BusinessDropdown';
import { TeachDropdown } from '../dropdowns/dropdown-singe-item/teach-on-lorem-dropdown/TeachDropdown';
import { LoginButton } from './LoginButton';
import { SignUpButton } from './SignUpButton';
import { OpenLanguageModalButton } from '../language-selection/OpenLanguageModalButton';
import { CompanyLogo } from './CompanyLogo';
import { CartDropdownOpener } from '../dropdowns/dropdown-singe-item/cart-dropdown/CartDropdownOpener';

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
              <CategoriesDropdownOpener />
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
              <CartDropdownOpener />
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
