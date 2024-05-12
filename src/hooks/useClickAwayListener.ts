import { useEffect } from 'react';

// NOTE: When the user clicks away from multilevel dropdown (including a different submenu opening item), potentially open submenu should close. Otherwise the newly clicked submenu might not open.

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
