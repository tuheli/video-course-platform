import { DragEvent } from 'react';
import { DraggableDataTransfer } from './DroppableArea';
import { getAbsoluteYCenterPosition } from './utils';

interface DraggableProps {
  id: string;
}

export const Draggable = ({ id }: DraggableProps) => {
  const onDragStart = (event: DragEvent) => {
    const targetAsHTMLElement = event.target as HTMLElement;

    const centerY = getAbsoluteYCenterPosition(targetAsHTMLElement);
    const mouseY = event.pageY;
    const centerOffset = centerY - mouseY;

    const dataForTransfer: DraggableDataTransfer = {
      id,
      centerY,
      centerOffset,
    };

    event.dataTransfer.setData('text/plain', JSON.stringify(dataForTransfer));
  };

  return (
    <div
      draggable={true}
      id={id}
      onDragStart={onDragStart}
      style={{
        backgroundColor: 'green',
        width: '300px',
        height: '50px',
      }}
    >
      <p>This element is draggable with id {id}</p>
    </div>
  );
};
