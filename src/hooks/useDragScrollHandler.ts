import { useRef } from 'react';

// NOTE: Not ready for use.
// Saved for future reference.

export const useDragScrollHandler = () => {
  const intervalRef = useRef<number | null>(null);
  const currentDirectionRef = useRef<'up' | 'down' | 'none'>('none');

  const scrollAmount = 50;

  const scrollDown = () => {
    scrollBy({
      top: scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollUp = () => {
    scrollBy({
      top: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const startScrolling = (direction: 'up' | 'down') => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (direction === 'up') {
        scrollUp();
      } else {
        scrollDown();
      }
    }, 50);
  };

  const stopScrolling = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    currentDirectionRef.current = 'none';
  };

  return {
    startScrolling,
    stopScrolling,
  };
};
