import { Box, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { ArrowRight } from './ArrowRight';
import { ArrowLeft } from './ArrowLeft';

interface ScrollToViewListProps {
  itemCount: number;
  itemQuerySelector: string;
  showCount: number;
  children?: React.ReactNode[];
}

export interface ArrowProps {
  onClick?: () => void;
}

const settings = {
  gapSize: 10,
};

export const arrowHorizontalOffset = 20;

// TODO: The logic for placing items inside the list should behave like flex space around or between. Then the items would be also automatically sized correctly. Current solution is quite rigid since the items have fixed width. Or just use react slick.

// NOTE: The child items must have scroll align start set, and the items must have specific dom structure for the scrollToIndex to find the correct node.

export const ScrollToViewList = ({
  children,
  itemCount,
  itemQuerySelector,
  showCount,
}: ScrollToViewListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);

  const lastAllowedIndex = itemCount - showCount;
  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex !== lastAllowedIndex;

  const scrollNextItemsToView = () => {
    let newIndex = currentIndex + showCount;

    if (newIndex > lastAllowedIndex) {
      newIndex = lastAllowedIndex;
    }

    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollPreviousItemsToView = () => {
    let newIndex = currentIndex - showCount;
    if (newIndex < 0) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    const listNode = listRef.current;
    if (!listNode) return;

    const childNodes = listNode.querySelectorAll(itemQuerySelector);
    if (!childNodes || childNodes.length === 0) return;

    const scrollToNode = childNodes[index];

    scrollToNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Stack
        ref={listRef}
        sx={{
          flexDirection: 'row',
          overflow: 'hidden',
          scrollSnapType: 'x mandatory',
          gap: `${settings.gapSize}px`,
        }}
      >
        {children}
      </Stack>
      {showRightArrow && (
        <ArrowRight
          onClick={scrollNextItemsToView}
          sx={{ right: -arrowHorizontalOffset, top: '40%' }}
        />
      )}
      {showLeftArrow && (
        <ArrowLeft
          onClick={scrollPreviousItemsToView}
          sx={{ left: -arrowHorizontalOffset, top: '40%' }}
        />
      )}
    </Box>
  );
};
