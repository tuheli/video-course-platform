import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import '../dropdowns/animations/fadeAnimation.css';
import { CourseItem } from './broadCoursesSelectionData';
import { dateLocale } from './common';
import { BestSeller } from './BestSeller';
import { DotSeparatedSpan } from './DotSeparatedSpan';
import CheckIcon from '@mui/icons-material/Check';
import { AddToCartButton } from './AddToCartButton';

interface PositionOffset {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface SpaceAround {
  spaceLeft: number;
  spaceRight: number;
  spaceAbove: number;
  spaceBelow: number;
}

interface RectangleSize {
  width: number;
  height: number;
}

interface CourseCardPopupContentProps {
  courseItem: CourseItem;
}

type RenderPosition = 'left' | 'right' | 'below' | 'above';

// Height adjusts to content but width is fixed
const popupWidth = 300;
const defaultGap = 0.5;

const getRenderPosition = (
  popupSize: RectangleSize,
  parentSpaceAround: SpaceAround
): Omit<RenderPosition, 'above'> => {
  const fitsRight = parentSpaceAround.spaceRight >= popupSize.width;
  const fitsLeft = parentSpaceAround.spaceLeft >= popupSize.width;

  if (fitsRight) return 'right';
  if (fitsLeft) return 'left';
  return 'below';
};

const getOffset = (
  parentSize: RectangleSize,
  childSize: RectangleSize,
  renderPosition: Omit<RenderPosition, 'above'>
) => {
  const centeredTop = (parentSize.height - childSize.height) / 2;
  const centeredLeft = (parentSize.width - childSize.width) / 2;

  switch (renderPosition) {
    case 'left':
      return {
        top: centeredTop,
        bottom: undefined,
        left: undefined,
        right: parentSize.width,
      };
    case 'right':
      return {
        top: centeredTop,
        left: parentSize.width,
        bottom: undefined,
        right: undefined,
      };
    case 'below':
      return {
        top: parentSize.height,
        left: centeredLeft,
        bottom: undefined,
        right: undefined,
      };

    default:
      return {
        top: parentSize.height,
        left: centeredLeft,
        bottom: undefined,
        right: undefined,
      };
  }
};

const getSpaceAroundElement = (element: HTMLElement): SpaceAround => {
  const rect = element.getBoundingClientRect();
  return {
    spaceLeft: rect.left,
    spaceRight: window.innerWidth - rect.right,
    spaceAbove: rect.top,
    spaceBelow: window.innerHeight - rect.bottom,
  };
};

const formatLastUpdatedDate = (date: Date) => {
  const month = date.toLocaleString(dateLocale, { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const CourseCardPopupContent = ({
  courseItem,
}: CourseCardPopupContentProps) => {
  const [positionOffset, setPositionOffset] = useState<PositionOffset | null>(
    null
  );
  const divRef = useRef<HTMLDivElement | null>(null);

  const lastUpdatedDateString = formatLastUpdatedDate(courseItem.lastUpdated);

  useEffect(() => {
    if (!divRef.current) return;
    if (!divRef.current.parentElement) return;

    const parentElement = divRef.current.parentElement;

    const popupSize = {
      width: popupWidth,
      height: divRef.current.clientHeight,
    };

    const parentSpaceAround = getSpaceAroundElement(parentElement);
    const renderPosition = getRenderPosition(popupSize, parentSpaceAround);

    const parentSize: RectangleSize = {
      width: parentElement.clientWidth,
      height: parentElement.clientHeight,
    };

    const offset = getOffset(parentSize, popupSize, renderPosition);

    setPositionOffset(offset);
  }, []);

  // NOTE: The position calculation uses clientwidth and clientheight so dont add margin or borders to the divref element. Padding is ok.

  return (
    <Box
      ref={divRef}
      sx={{
        position: 'absolute',
        zIndex: 1,
        top: positionOffset?.top,
        bottom: positionOffset?.bottom,
        left: positionOffset?.left,
        right: positionOffset?.right,
        width: popupWidth,
        animation: 'fadeIn 0.2s',
      }}
    >
      <Paper>
        <Stack
          sx={{
            flexDirection: 'column',
            gap: defaultGap,
          }}
        >
          <Typography variant="h6">{courseItem.title}</Typography>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: defaultGap,
            }}
          >
            {courseItem.isBestseller && <BestSeller />}
            <Typography
              variant="caption"
              sx={{
                color: 'text.green',
              }}
            >
              Updated {''}
              <Typography
                component="span"
                variant="caption"
                sx={{
                  color: 'text.green',
                  fontWeight: 500,
                }}
              >
                {lastUpdatedDateString}
              </Typography>
            </Typography>
          </Stack>
          <Box>
            <DotSeparatedSpan>{courseItem.lengthHours} hours</DotSeparatedSpan>
            <DotSeparatedSpan useDotSeparator={courseItem.hasSubtitles}>
              {courseItem.difficultyLevel}
            </DotSeparatedSpan>
            <DotSeparatedSpan useDotSeparator={false}>
              {courseItem.hasSubtitles && 'Subtitles'}
            </DotSeparatedSpan>
          </Box>
          <Stack
            style={{
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {courseItem.bulletPoints.map((text, index) => (
              <Stack
                key={index}
                sx={{
                  flexDirection: 'row',
                  gap: 2,
                }}
              >
                <CheckIcon />
                <Typography variant="body2">{text}</Typography>
              </Stack>
            ))}
          </Stack>
          <AddToCartButton item={courseItem} />
        </Stack>
      </Paper>
    </Box>
  );
};
