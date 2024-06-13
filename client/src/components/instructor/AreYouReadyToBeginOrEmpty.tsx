import { Box } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { AreYouReadyToBegin } from './AreYouReadyToBegin';

export const AreYouReadyToBeginOrEmpty = () => {
  const myEmail = useAppSelector((state) => state.me.user?.email);

  const isAreYouReadyToBeginVisible =
    useAppSelector((state) => state.courseDrafts).filter(
      ({ creatorEmail }) => myEmail === creatorEmail
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
