import { IDraggable } from './Draggable';

export interface ItemWithOrderIndex {
  id: string;
  orderIndex: number;
}

export function giveItemsOrderIndicies<T extends { id: string }>(
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

export const getDraggables = (
  dropareaElement: HTMLDivElement,
  draggedItemId: string,
  dragImageCenterY: number
) => {
  const draggales: IDraggable[] = [
    ...dropareaElement.querySelectorAll('div.draggable'),
  ].map((element) => {
    const isDragged = element.id === draggedItemId;

    const yPosition = isDragged
      ? dragImageCenterY
      : getAbsoluteYCenterPosition(element as HTMLElement);

    const draggable: IDraggable = {
      id: element.id,
      yPosition,
    };

    return draggable;
  });

  return draggales;
};

export const isOrderChanged = (
  oldOrder: Array<{ id: string }>,
  newOrder: Array<{ id: string }>
) => {
  return oldOrder.some((oldItem, index) => oldItem.id !== newOrder[index].id);
};

const sortByYPosition = (a: { yPosition: number }, b: { yPosition: number }) =>
  a.yPosition - b.yPosition;

export const sortItemsByYPosition = (items: Array<{ yPosition: number }>) => {
  items.sort(sortByYPosition);
};
