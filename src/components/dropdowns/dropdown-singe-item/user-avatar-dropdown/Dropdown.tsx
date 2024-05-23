import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { UserAvatar } from '../../../me/UserAvatar';
import { useAppSelector } from '../../../../app/hooks';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Circle } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const avatarSize = 80;
const menuItemPadding = 2;
const menuItemHeight = 40;

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
          <UserDetails fullName={me.fullName} email={me.credentials.email} />
          <Stack
            sx={{
              flexDirection: 'column',
            }}
          >
            <Divider sx={{ mb: 1 }} />
            <MenuItemLink text="Student" to="/" />
            <Divider sx={{ my: 1 }} />
            <MenuItemLink text="Notifications" to="/">
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
            </MenuItemLink>
            <Divider sx={{ my: 1 }} />
            <MenuItemLink text="Account settings" to="/" />
            <MenuItemLink text="Payout & tax settings" to="/" />
            <Divider sx={{ my: 1 }} />
            <MenuItemLink text="Public profile" to="/" />
            <MenuItemLink text="Edit profile" to="/" />
            <Divider sx={{ my: 1 }} />
            <MenuItemLink text="Help" to="/" />
            <MenuItemLink text="Log out" to="/" />
            <Divider sx={{ mt: 1 }} />
            <BusinessLink />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

interface MenuItemLinkProps {
  text: string;
  to: string;
  children?: React.ReactNode;
}

const MenuItemLink = ({ text, to, children }: MenuItemLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      to={to}
      style={{
        textDecoration: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: menuItemPadding,
          height: menuItemHeight,
        }}
      >
        <Typography
          sx={{
            width: '100%',
            color: isHovered ? 'secondary.main' : 'text.primary',
            '&:hover': {
              color: 'secondary.main',
            },
          }}
        >
          {text}
        </Typography>
        {children}
      </Box>
    </Link>
  );
};

const BusinessLink = () => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      to="/"
      style={{
        textDecoration: 'none',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          padding: menuItemPadding,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'column',
            width: '100%',
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              color: isHovered ? 'secondary.main' : 'text.primary',
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            Lorem Business
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
            }}
          >
            Bring learning to your company
          </Typography>
        </Stack>
        <ExitToAppIcon
          sx={{
            color: 'text.primary',
          }}
        />
      </Stack>
    </Link>
  );
};

interface UserDetailsProps {
  fullName: string;
  email: string;
}

const UserDetails = ({ fullName, email }: UserDetailsProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      to="/"
      style={{
        textDecoration: 'none',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
          p: menuItemPadding,
        }}
      >
        <UserAvatar
          sx={{
            width: avatarSize,
            height: avatarSize,
            fontSize: 32,
            fontWeight: 600,
          }}
        />
        <Stack
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: isHovered ? 'secondary.main' : 'text.primary',
            }}
          >
            {fullName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {email}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};
