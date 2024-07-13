import { Box, Stack } from '@mui/material';
import { ComponentType } from 'react';

interface ComponentProps {
  onClick?: () => void;
}

export interface ColumnOrderedGridItem {
  RenderComponent: ComponentType<ComponentProps>;
}

interface ColumnOrderedGridProps<T extends ColumnOrderedGridItem> {
  items: T[];
  stackHeight: number;
  gap?: number;
}

function createStacks<T>(items: T[], stackHeight: number): T[][] {
  const groups: T[][] = [];

  const rowCount = Math.ceil(items.length / stackHeight);
  let extraCount = items.length % rowCount;

  for (let i = 0; i < rowCount; i++) {
    groups.push([]);
  }

  let groupIndex = 0;
  let i = 0;

  while (i < items.length) {
    const item = items[i];
    groups[groupIndex].push(item);

    if (groups[groupIndex].length === stackHeight) {
      if (extraCount > 0) {
        const extraItem = items[i + 1];
        groups[groupIndex].push(extraItem);
        extraCount--;
        i++;
      }
      groupIndex++;
    }
    i++;
  }

  return groups.filter((group) => group.length > 0);
}

// NOTE: This component is used to make a grid in which
// the items are ordered a column at a time. As far as
// I know if done only with css the visual order of the items
// won't be the same as the order in the dom. But im not
// 100% sure about that. It is used in footer and select
// language modal to order items.

export const ColumnOrderedGrid = <T extends ColumnOrderedGridItem>({
  items,
  stackHeight,
  gap = 0,
}: ColumnOrderedGridProps<T>) => {
  const stacks = createStacks(items, stackHeight);

  return (
    <Stack
      flexDirection="row"
      sx={{
        justifyContent: 'center',
        gap,
      }}
    >
      {stacks.map((stack, index) => {
        return (
          <Stack key={index} flexDirection="column">
            {stack.map((item, index) => (
              <Box key={index}>
                <item.RenderComponent />
              </Box>
            ))}
          </Stack>
        );
      })}
    </Stack>
  );
};
