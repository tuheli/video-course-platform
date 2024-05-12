import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { maxOfferDuration, secondPassed } from '../../features/offerSlice';

export const SpecialOfferTimer = () => {
  const duration = useAppSelector((state) => state.offer.duration);
  const dispatch = useAppDispatch();
  const timerRef = useRef(0);

  const formatDuration = (durationSeconds: number) => {
    const date = new Date(0);
    date.setSeconds(durationSeconds);

    const isoString = date.toISOString();

    // Cast to num to remove trailing zeroes
    const hours = Number(isoString.substring(11, 13));
    const minutes = Number(isoString.substring(14, 16));
    const seconds = Number(isoString.substring(17, 19));

    if (hours === 0 && minutes === 0) {
      return `${seconds}s`;
    }

    if (hours === 0) {
      return `${minutes}m ${seconds}s`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(secondPassed());
    }, 1000);

    timerRef.current = timerId;

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const isDurationAcceptable = duration > 0 && duration <= maxOfferDuration;

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
