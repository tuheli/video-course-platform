import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export const SpecialOfferTimer = () => {
  const offerDuration = 14400; // 4 hours
  const [time, setTime] = useState(offerDuration);
  const intervalRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    intervalRef.current = intervalId;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

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

  const remainingTime = formatDuration(time);

  return (
    <Typography
      variant="h6"
      component="span"
      sx={{
        color: 'text.primary',
      }}
    >
      {remainingTime}.
    </Typography>
  );
};
