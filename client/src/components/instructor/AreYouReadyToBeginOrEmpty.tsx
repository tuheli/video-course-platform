import { Box } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { AreYouReadyToBegin } from './AreYouReadyToBegin';

export const AreYouReadyToBeginOrEmpty = () => {
  const signedInUser = useAppSelector((state) => state.userState.user);

  // This next thing is a bit weird.
  // It was done early on when I did the frontend
  // but it just checks if the user has any courses.
  // Nowdays I would write things like this a bit
  // more readable maybe using extra boolean like
  // doesUserHaveAnyCourses or something like that and
  // then like
  // isAreYouReadyToBeginVisible = isUserSignedIn && doesUserHaveAnyCourses etc.
  const isAreYouReadyToBeginVisible =
    useAppSelector((state) => state.courseDrafts).filter(
      ({ creatorEmail }) => signedInUser?.email === creatorEmail
    ).length === 0;

  return (
    <>
      {isAreYouReadyToBeginVisible && (
        <Box
          sx={{
            pb: 8,
          }}
        >
          <AreYouReadyToBegin />
        </Box>
      )}
    </>
  );
};
