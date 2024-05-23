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
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { TypographyLink } from '../instructor/TypographyLink';
import { InstructorLink } from './InstructorLink';

const itemGap = 2;

const AppAppBar = () => {
  const me = useAppSelector((state) => state.me.user);
  const location = useLocation();

  const showTeachDropdown = !me && location.pathname !== '/teaching';

  const showInstructorLink = Boolean(me);

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
        <Toolbar
          sx={{
            zIndex: 1,
          }}
        >
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
              {showTeachDropdown && <TeachDropdown />}
              {showInstructorLink && <InstructorLink />}
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
