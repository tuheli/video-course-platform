import { Box, IconButton, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface ScrollToViewListProps {
  itemCount: number;
  itemQuerySelector: string;
  children?: React.ReactNode[];
}

interface ArrowProps {
  onClick: () => void;
}

const settings = {
  showCount: 5,
  gapSize: 10,
};

const arrowHorizontalOffset = 20;

const ArrowRight = ({ onClick }: ArrowProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '20%',
        right: -arrowHorizontalOffset,
      }}
    >
      <IconButton color="primary" onClick={onClick}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

const ArrowLeft = ({ onClick }: ArrowProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '20%',
        left: -arrowHorizontalOffset,
      }}
    >
      <IconButton color="primary" onClick={onClick}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

// TODO: The logic for placing items inside the list should behave like flex space around or between. Then the items would be also automatically sized correctly. Current solution is quite rigid since the items have fixed width. Or just use react slick.

// NOTE: The child items must have scroll align start set, and the items must have specific dom structure for the scrollToIndex to find the correct node.

export const ScrollToViewList = ({
  children,
  itemCount,
  itemQuerySelector,
}: ScrollToViewListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);

  const showCount = settings.showCount;
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
      {showRightArrow && <ArrowRight onClick={scrollNextItemsToView} />}
      {showLeftArrow && <ArrowLeft onClick={scrollPreviousItemsToView} />}
    </Box>
  );
};
