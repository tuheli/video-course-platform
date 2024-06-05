import { ReactNode, useRef, useState } from 'react';
import { useDragAndDropContext } from '../../hooks/useDragAndDropContext';
import { DroppableAreaContext } from '../../contexts/DroppableAreaContext';
import {
  getDraggables,
  isOrderChanged,
  giveItemsOrderIndicies,
  sortByYPositionCopy,
} from './utils';

export interface DraggableDataTransfer {
  id: string;
  centerY: number;
  centerOffset: number;
}

interface DroppableAreaProps {
  children: ReactNode;
}

// NOTE: Inside the droppable area it is important
// to only render elements wrapped inside the draggable
// component

export const DroppableArea = ({ children }: DroppableAreaProps) => {
  const [draggedItemId, setDraggedItemId] = useState('');
  const [draggedItemCenterY, setDraggedItemCenterY] = useState<
    number | undefined
  >(undefined);
  const { itemsState, changeOrder } = useDragAndDropContext();
  const dropareaRef = useRef<HTMLDivElement>(null);

  const tickUpdateOrder = (draggedItemId: string, dragImageCenterY: number) => {
    if (!dropareaRef.current) return;

    const draggables = getDraggables(
      dropareaRef.current,
      draggedItemId,
      dragImageCenterY
    );

    const yPositionOrderedDraggables = sortByYPositionCopy(draggables);

    const didOrderChange = isOrderChanged(
      itemsState,
      yPositionOrderedDraggables
    );

    if (!didOrderChange) return;

    const newOrder = giveItemsOrderIndicies(
      itemsState,
      yPositionOrderedDraggables
    );

    changeOrder(newOrder);
  };

  const onDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!draggedItemId || draggedItemCenterY === undefined) return;

    const centerOffset = draggedItemCenterY - event.pageY;
    const imagePosition = draggedItemCenterY - centerOffset;

    tickUpdateOrder(draggedItemId, imagePosition);
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <DroppableAreaContext.Provider
      value={{ setDraggedItemId, setDraggedItemCenterY }}
    >
      <div
        ref={dropareaRef}
        className="droppable-area"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {children}
      </div>
    </DroppableAreaContext.Provider>
  );
};
