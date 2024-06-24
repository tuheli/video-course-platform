export interface ItemWithOrderIndex {
  id: number;
  orderIndex: number;
}

export function giveItemsOrderIndicies<T extends { id: number }>(
  oldOrder: T[],
  newOrder: T[]
): ItemWithOrderIndex[] {
  if (oldOrder.length !== newOrder.length) {
    return oldOrder.map((item, index) => ({
      id: item.id,
      orderIndex: index,
    }));
  }

  const newState = oldOrder.map((item) => {
    const newOrderIndex = newOrder.findIndex(
      (newItem) => newItem.id === item.id
    );

    const newItem: ItemWithOrderIndex = {
      id: item.id,
      orderIndex: newOrderIndex,
    };

    return newItem;
  });

  return newState;
}

export const getAbsoluteYCenterPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return rect.y + window.scrollY + rect.height / 2;
};

export const getDroppedItemCenterYPosition = (
  droppedItemCenterOffset: number,
  dropEventMouseY: number
) => {
  const centerY = dropEventMouseY + droppedItemCenterOffset;
  return centerY;
};

export const getAbsolutePosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return {
    y: rect.y + window.scrollY,
    x: rect.x + window.scrollX,
  };
};

export const isOrderChanged = (
  oldOrder: Array<{ id: number }>,
  newOrder: Array<{ id: number }>
) => {
  return oldOrder.some((oldItem, index) => oldItem.id !== newOrder[index].id);
};

export function getSortedByOrderIndexCopy<T extends { orderIndex: number }>(
  array: T[]
) {
  const copy = [...array];
  return copy.sort((a, b) => a.orderIndex - b.orderIndex);
}

export function sortByYPosition<T extends { yPosition: number }>(array: T[]) {
  const copy = [...array];
  return copy.sort((a, b) => a.yPosition - b.yPosition);
}
