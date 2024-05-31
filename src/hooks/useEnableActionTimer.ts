import { useEffect, useRef, useState } from 'react';

// NOTE: Initially made for waiting
// until keyframe animations are completed
// in curriculum item addition components.
// The animations dont transition from
// their current position since the components
// are conditionally rendered and the animations
// start from 0% or 100%. Without waiting
// there will be janky animations if user
// switches state fast.

export const useEnableActionTimer = (enableAfterDuration: number) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    if (isEnabled) return;

    const timerId = setTimeout(() => {
      setIsEnabled(true);
    }, enableAfterDuration);

    timerRef.current = timerId;

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return { isEnabled };
};
