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
  onClickItem?: (item: T) => void;
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

export const ColumnOrderedGrid = <T extends ColumnOrderedGridItem>({
  items,
  stackHeight,
  onClickItem,
}: ColumnOrderedGridProps<T>) => {
  const stacks = createStacks(items, stackHeight);

  return (
    <Stack
      flexDirection="row"
      sx={{
        justifyContent: 'center',
      }}
    >
      {stacks.map((stack, index) => {
        return (
          <Stack key={index} flexDirection="column">
            {stack.map((item, index) => (
              <Box key={index} onClick={() => onClickItem?.(item)}>
                <item.RenderComponent />
              </Box>
            ))}
          </Stack>
        );
      })}
    </Stack>
  );
};
