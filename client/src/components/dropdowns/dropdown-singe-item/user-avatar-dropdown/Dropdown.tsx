import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../../../app/hooks';
import { Circle } from '@mui/icons-material';
import { UserDetailsLink } from './UserDetailsLink';
import { BusinessLink } from './BusinessLink';
import { LinkItem } from './LinkItem';

export const avatarSize = 80;
export const menuItemPadding = 2;
export const menuItemHeight = 40;

export const Dropdown = () => {
  const me = useAppSelector((state) => state.me.user);

  if (!me) return null;

  return (
    <Box
      sx={{
        bgcolor: 'transparent',
      }}
    >
      <Paper
        sx={{
          width: 300,
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.2s',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
          }}
        >
          <UserDetailsLink fullName={me.fullName} email={me.email} />
          <Stack
            sx={{
              flexDirection: 'column',
            }}
          >
            <Divider sx={{ mb: 1 }} />
            <LinkItem text="Student" to="/" />
            <Divider sx={{ my: 1 }} />
            <LinkItem text="Notifications" to="/">
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                }}
              >
                <Circle
                  sx={{
                    width: 32,
                    height: 32,
                    color: 'secondary.main',
                  }}
                />
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '50%',
                    transform: 'translateY(-50%) translateX(50%)',
                    fontWeight: 600,
                    color: 'text.contrast',
                  }}
                >
                  2
                </Typography>
              </Box>
            </LinkItem>
            <Divider sx={{ my: 1 }} />
            <LinkItem text="Account settings" to="/" />
            <LinkItem text="Payout & tax settings" to="/" />
            <Divider sx={{ my: 1 }} />
            <LinkItem text="Public profile" to="/" />
            <LinkItem text="Edit profile" to="/" />
            <Divider sx={{ my: 1 }} />
            <LinkItem text="Help" to="/" />
            <LinkItem text="Log out" to="/logout" />
            <Divider sx={{ mt: 1 }} />
            <BusinessLink />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
