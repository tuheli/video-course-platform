import { useEffect } from 'react';

// NOTE: The padding amount is not pixel perfect and can
// cause a minor visual bug. But its not really noticeable
// and only happens with specific resolutions.

// This hook was initially made for select language modal
// component but it should be used with other modals / dialogs
//  which have material ui's disable scroll lock behaviour to
// fix padding issues. Instead of mui's scroll lock use
// this hook and disable mui's scroll lock.

const getScrollBarWidth = () => {
  const inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';

  const outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);

  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return w1 - w2;
};

const isScrollbarVisible = () => {
  return document.body.scrollHeight > window.innerHeight;
};

export const useDisableScrollbar = (isDisabled: boolean) => {
  useEffect(() => {
    if (!isScrollbarVisible()) return;

    if (isDisabled) {
      document.body.style.overflowY = 'hidden';
      const scrollBarWidth = getScrollBarWidth();
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.paddingRight = '0px';
    }
  }, [isDisabled]);
};
