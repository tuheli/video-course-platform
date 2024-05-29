import { DraggableDataTransfer } from './DroppableArea';

export const getAbsoluteYCenterPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return rect.y + window.scrollY + rect.height / 2;
};

export const getDroppedItemCenterYPosition = (
  droppedItem: DraggableDataTransfer,
  dropEventMouseY: number
) => {
  const centerY = dropEventMouseY + droppedItem.centerOffset;
  return centerY;
};

export const getAbsolutePosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return {
    y: rect.y + window.scrollY,
    x: rect.x + window.scrollX,
  };
};
