import { Box } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { AreYouReadyToBegin } from './AreYouReadyToBegin';

export const AreYouReadyToBeginOrEmpty = () => {
  const signedInUser = useAppSelector((state) => state.userState.user);

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
