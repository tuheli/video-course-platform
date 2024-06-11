import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  offerExpired,
  maxOfferDuration,
  secondPassed,
} from '../../../features/specialOfferSlice';
import { getDuration } from '../../../utils/formatters';

const formatDuration = (durationSeconds: number) => {
  const { hours, minutes, seconds } = getDuration(durationSeconds);

  if (hours === 0 && minutes === 0) {
    return `${seconds}s`;
  }

  if (hours === 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${hours}h ${minutes}m ${seconds}s`;
};

export const SpecialOfferTimer = () => {
  const duration = useAppSelector((state) => state.specialOffer.duration);
  const dispatch = useAppDispatch();
  const timerRef = useRef(0);

  const isDurationAcceptable =
    !isNaN(duration) && duration >= 0 && duration <= maxOfferDuration;

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(secondPassed());
    }, 1000);

    timerRef.current = timerId;

    return () => {
      clearInterval(timerRef.current);
    };
  }, [dispatch]);

  useEffect(() => {
    // Offer expired or the duration is malformed
    if (!isDurationAcceptable) {
      dispatch(offerExpired());
      stopTimer();
    }
  }, [isDurationAcceptable, dispatch]);

  const timeString = isDurationAcceptable
    ? formatDuration(duration)
    : '0h 0m 0s';

  return (
    <Typography
      variant="h6"
      component="span"
      sx={{
        color: 'text.primary',
      }}
    >
      {timeString}
    </Typography>
  );
};
