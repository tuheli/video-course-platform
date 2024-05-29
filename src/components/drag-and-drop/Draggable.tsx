import { DragEvent, useState } from 'react';
import { DraggableDataTransfer } from './DroppableArea';
import { getAbsolutePosition, getAbsoluteYCenterPosition } from './utils';
import { DraggableContext } from '../../contexts/DraggableContext';

interface ReorderableByYPosition {
  yPosition: number;
}

export interface IDraggable extends ReorderableByYPosition {
  id: string;
}

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export const Draggable = ({ id, children }: DraggableProps) => {
  const [isDraggable, setIsDraggable] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [dragStartMouseY, setDragStartMouseY] = useState(0);

  const onDragStart = (event: DragEvent) => {
    const createInvisibleGhostImage = () => {
      const dragGhostElement = document.createElement('div');

      dragGhostElement.id = 'drag-ghost-element';
      dragGhostElement.style.position = 'absolute';
      dragGhostElement.style.visibility = 'hidden';

      document.body.appendChild(dragGhostElement);
      event.dataTransfer.setDragImage(dragGhostElement, 0, 0);
    };

    const createPlaceholderElement = () => {
      const targetAsHTMLElement = event.target as HTMLElement;
      const placeholderElement = targetAsHTMLElement.cloneNode(
        true
      ) as HTMLElement;

      placeholderElement.id = 'drag-placeholder-element';
      placeholderElement.style.position = 'absolute';
      placeholderElement.style.opacity = '0.5';

      const absolutePosition = getAbsolutePosition(targetAsHTMLElement);

      placeholderElement.style.top = `${absolutePosition.y}px`;
      placeholderElement.style.left = `${absolutePosition.x}px`;

      document.body.appendChild(placeholderElement);
    };

    const setDataTransfer = () => {
      const targetAsHTMLElement = event.target as HTMLElement;
      const centerY = getAbsoluteYCenterPosition(targetAsHTMLElement);
      const centerOffset = centerY - event.pageY;

      const dataForTransfer: DraggableDataTransfer = {
        id,
        centerY,
        centerOffset,
      };

      event.dataTransfer.setData('text/plain', JSON.stringify(dataForTransfer));
      event.dataTransfer.effectAllowed = 'move';
    };

    const setDraggableStyle = () => {
      const targetAsHTMLElement = event.target as HTMLElement;
      targetAsHTMLElement.style.position = 'relative';
      targetAsHTMLElement.style.top = '0px';
      targetAsHTMLElement.style.zIndex = '100000';
      targetAsHTMLElement.style.backgroundColor = 'white';
    };

    createInvisibleGhostImage();
    createPlaceholderElement();
    setDataTransfer();
    setDraggableStyle();
    setDragStartMouseY(event.pageY);
    setIsBeingDragged(true);
  };

  const onDragEnd = (event: DragEvent) => {
    const destroyGhostElement = () => {
      const dragGhostElement = document.getElementById('drag-ghost-element');
      if (!dragGhostElement) return;
      document.body.removeChild(dragGhostElement);
    };

    const destroyPlaceholderElement = () => {
      const placeholderElement = document.getElementById(
        'drag-placeholder-element'
      );
      if (!placeholderElement) return;
      document.body.removeChild(placeholderElement);
    };

    const removeDraggableStyle = () => {
      const targetAsHTMLElement = event.target as HTMLElement;
      targetAsHTMLElement.style.position = '';
      targetAsHTMLElement.style.top = '';
      targetAsHTMLElement.style.zIndex = '';
      targetAsHTMLElement.style.backgroundColor = '';
    };

    destroyGhostElement();
    destroyPlaceholderElement();
    removeDraggableStyle();
    setIsBeingDragged(false);
    setDragStartMouseY(0);
  };

  const onDrag = (event: DragEvent) => {
    const currentMouseY = event.pageY;
    const mouseYDelta = dragStartMouseY - currentMouseY;

    const targetAsHTMLElement = event.target as HTMLElement;
    targetAsHTMLElement.style.top = `${-mouseYDelta}px`;
  };

  return (
    <DraggableContext.Provider value={{ isBeingDragged, setIsDraggable }}>
      <div
        draggable={isDraggable}
        id={id}
        className="draggable"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrag={onDrag}
      >
        {children}
      </div>
    </DraggableContext.Provider>
  );
};
