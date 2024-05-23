import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { StudentDropdown } from '../dropdowns/dropdown-singe-item/student-dropdown/StudentDropdown';
import { UserAvatarDropdown } from '../dropdowns/dropdown-singe-item/user-avatar-dropdown/UserAvatarDropdown';

const itemGap = 2;

export const InstructorAppBar = () => {
  return (
    <AppBar
      sx={{
        position: 'static',
      }}
    >
      <Toolbar
        sx={{
          zIndex: 1,
          boxShadow: 0,
          bgcolor: 'green',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            bgcolor: 'yellow',
            flexGrow: 1,
            gap: itemGap,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
            }}
          />
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: itemGap,
            }}
          >
            <StudentDropdown />
            <UserAvatarDropdown />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
