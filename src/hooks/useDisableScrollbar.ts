import { useEffect } from 'react';

// NOTE: The padding amount is not pixel perfect and can cause a very minor visual bug (like 1 pixel too much padding to the document body). But its not really noticeable and only happens with specific resolutions.

const getScrollBarWidth = () => {
  var inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);

  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return w1 - w2;
};

export const useDisableScrollbar = (isDisabled: boolean) => {
  useEffect(() => {
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
