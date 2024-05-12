import { useEffect } from 'react';

export const useClickAwayListener = (
  divRef: React.RefObject<HTMLElement>,
  isDropdownOpen: boolean,
  useHover: boolean,
  onClickAway: () => void
) => {
  useEffect(() => {
    const clickAwayListener = (event: any) => {
      if (
        isDropdownOpen &&
        divRef.current &&
        !divRef.current.contains(event.target)
      ) {
        onClickAway();
      }
    };

    if (useHover) return;

    document.addEventListener('mousedown', clickAwayListener);
    document.addEventListener('touchstart', clickAwayListener);

    return () => {
      document.removeEventListener('mousedown', clickAwayListener);
      document.removeEventListener('touchstart', clickAwayListener);
    };
  }, [isDropdownOpen]);
};
