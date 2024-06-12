import { Avatar, Box, SxProps } from '@mui/material';
import { useAppSelector } from '../../app/hooks';

interface AvatarLetters {
  firstLetter?: string;
  secondLetter?: string;
}

const getAvatarLetters = (fullName: string): AvatarLetters => {
  const names = fullName.split(' ');

  if (names.length === 1) {
    return {
      firstLetter: names[0][0].toUpperCase(),
    };
  }

  if (names.length > 1) {
    return {
      firstLetter: names[0][0].toUpperCase(),
      secondLetter: names[names.length - 1][0],
    };
  }

  return {
    firstLetter: undefined,
    secondLetter: undefined,
  };
};

export interface UserAvatarProps {
  sx?: SxProps;
}

export const UserAvatar = ({ sx }: UserAvatarProps) => {
  const me = useAppSelector((state) => state.me.user);

  const avatarLetters = me ? getAvatarLetters(me.fullName) : {};

  return (
    <Box
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: 'text.primary',
          color: 'text.contrast',
          fontWeight: 600,
          ...sx,
        }}
      >
        {avatarLetters.firstLetter}
        {avatarLetters.secondLetter}
      </Avatar>
    </Box>
  );
};
