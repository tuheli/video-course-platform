import { ReactNode, useRef } from 'react';
import { useDragAndDropContext } from '../../hooks/useDragAndDropContext';
import { DroppableAreaContext } from '../../contexts/DroppableAreaContext';
import {
  getDraggables,
  sortItemsByYPosition,
  isOrderChanged,
  giveItemsOrderIndicies,
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
  const { itemsState, changeOrder } = useDragAndDropContext();
  const dropareaRef = useRef<HTMLDivElement>(null);

  const tickUpdateOrder = (draggedItemId: string, dragImageCenterY: number) => {
    if (!dropareaRef.current) return;

    const draggables = getDraggables(
      dropareaRef.current,
      draggedItemId,
      dragImageCenterY
    );

    sortItemsByYPosition(draggables);

    const didOrderChange = isOrderChanged(itemsState, draggables);
    if (!didOrderChange) return;

    const newOrder = giveItemsOrderIndicies(itemsState, draggables);
    changeOrder(newOrder);
  };

  const onDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <DroppableAreaContext.Provider value={{ tickUpdateOrder }}>
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
