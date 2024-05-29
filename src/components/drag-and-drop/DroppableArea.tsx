import { ReactNode, useRef } from 'react';
import {
  getAbsoluteYCenterPosition,
  getDroppedItemCenterYPosition,
} from './utils';
import { IDraggable } from './Draggable';
import { useDragAndDropContext } from '../../hooks/useDragAndDropContext';

export interface DraggableDataTransfer {
  id: string;
  centerY: number;
  centerOffset: number;
}

interface DroppableAreaProps {
  children: ReactNode;
}

// NOTE: Inside the droppable area it is important to only render elements wrapped inside the draggable component

export const DroppableArea = ({ children }: DroppableAreaProps) => {
  const { changeOrder } = useDragAndDropContext();

  const dropareaRef = useRef<HTMLDivElement>(null);

  const onDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  // On drop we get the center y positions
  // of all div elements inside the drop area.
  // The draggables will then be sorted
  // by their y positions.

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (!dropareaRef.current) return;

    const data = event.dataTransfer.getData('text/plain');

    const droppedItem: DraggableDataTransfer = JSON.parse(data);

    const draggales: IDraggable[] = [
      ...dropareaRef.current.querySelectorAll('div.draggable'),
    ].map((element) => {
      const wasDropped = element.id === droppedItem.id;

      const yPosition = wasDropped
        ? getDroppedItemCenterYPosition(droppedItem, event.pageY)
        : getAbsoluteYCenterPosition(element as HTMLElement);

      const draggable: IDraggable = {
        id: element.id,
        yPosition,
        wasDroppedRecently: wasDropped,
      };

      return draggable;
    });

    changeOrder(draggales);
  };

  return (
    <div
      ref={dropareaRef}
      className="droppable-area"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
};
