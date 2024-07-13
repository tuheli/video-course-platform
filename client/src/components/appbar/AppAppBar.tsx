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
import { InstructorLink } from './InstructorLink';
import { UserAvatarDropdown } from '../dropdowns/dropdown-singe-item/user-avatar-dropdown/UserAvatarDropdown';

const itemGap = 2;

const AppAppBar = () => {
  const signedInUser = useAppSelector((state) => state.userState.user);
  const location = useLocation();

  const isTeachDropdownVisible =
    !signedInUser && location.pathname !== '/teaching';
  const isInstructorLinkVisible = Boolean(signedInUser);

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
              {isTeachDropdownVisible && <TeachDropdown />}
              {isInstructorLinkVisible && <InstructorLink />}
              <CartDropdownOpener />
            </Stack>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: itemGap,
              }}
            >
              {signedInUser && (
                <UserAvatarDropdown
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 14,
                  }}
                />
              )}
              {!signedInUser && (
                <>
                  <LoginButton />
                  <SignUpButton />
                  <OpenLanguageModalButton />
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default AppAppBar;
