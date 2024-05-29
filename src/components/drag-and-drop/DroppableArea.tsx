import { ReactNode, useContext, useRef } from 'react';
import { DraggableContext } from './DraggableContext';
import {
  getAbsoluteYCenterPosition,
  getDroppedItemCenterYPosition,
} from './utils';
import { IDraggable } from './draggableData';

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
  const { changeOrder } = useContext(DraggableContext);

  const dropareaRef = useRef<HTMLDivElement>(null);

  const size = '600px';

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
      ...dropareaRef.current.querySelectorAll('div'),
    ].map((element) => {
      const wasDropped = element.id === droppedItem.id;

      const yPosition = wasDropped
        ? getDroppedItemCenterYPosition(droppedItem, event.pageY)
        : getAbsoluteYCenterPosition(element);

      const draggable: IDraggable = {
        id: element.id,
        yPosition,
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
      style={{
        backgroundColor: 'yellow',
        width: size,
        height: size,
        padding: '10px',
      }}
    >
      {children}
    </div>
  );
};
