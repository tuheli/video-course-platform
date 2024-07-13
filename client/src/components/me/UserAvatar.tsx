import { Avatar, Box, SxProps } from '@mui/material';
import { useAppSelector } from '../../app/hooks';

interface AvatarLetters {
  firstLetter?: string;
  secondLetter?: string;
}

const getAvatarLetters = (fullName: string): AvatarLetters => {
  try {
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
  } catch (error) {
    // client gave a bad name
    // TODO: actual name validation

    // Try again if there would be something to show
    // on the avatar icon instead of a plain black circle
    try {
      const character = fullName[0];
      return {
        firstLetter: character,
        secondLetter: undefined,
      };
    } catch (error) {
      // ignore error
    }
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
  const signedInUser = useAppSelector((state) => state.userState.user);

  const avatarLetters = signedInUser
    ? getAvatarLetters(signedInUser.fullName)
    : {};

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
        {avatarLetters.firstLetter || ''}
        {avatarLetters.secondLetter || ''}
      </Avatar>
    </Box>
  );
};
