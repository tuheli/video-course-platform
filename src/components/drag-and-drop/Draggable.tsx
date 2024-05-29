import { DragEvent, useEffect, useRef, useState } from 'react';
import { DraggableDataTransfer } from './DroppableArea';
import { getAbsolutePosition, getAbsoluteYCenterPosition } from './utils';
import { DraggableContext } from '../../contexts/DraggableContext';
import { wasDroppedDuration } from './common';

interface ReorderableByYPosition {
  yPosition: number;
}

export interface IDraggable extends ReorderableByYPosition {
  id: string;
  wasDroppedRecently?: boolean;
}

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export const Draggable = ({ id, children }: DraggableProps) => {
  const [wasDroppedRecently, setWasDroppedRecently] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [dragStartMouseY, setDragStartMouseY] = useState(0);
  const timerIdRef = useRef(0);

  const onDragStart = (event: DragEvent) => {
    const createPlaceholderElement = () => {
      const targetAsHTMLElement = event.target as HTMLElement;
      const placeholderElement = targetAsHTMLElement.cloneNode(
        true
      ) as HTMLElement;

      placeholderElement.id = 'drag-placeholder-element';
      placeholderElement.style.position = 'absolute';
      placeholderElement.style.opacity = '0.2';

      // Removes border animation if it exists
      const animatedElements = placeholderElement.querySelectorAll(
        '.border-animation-parent'
      );

      animatedElements.forEach((element) => {
        element.className = '';
      });

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

    const clearWasDroppedRecently = () => {
      clearTimeout(timerIdRef.current);
      setWasDroppedRecently(false);
    };

    event.dataTransfer.setDragImage(new Image(), 0, 0);
    clearWasDroppedRecently();
    createPlaceholderElement();
    setDataTransfer();
    setDraggableStyle();
    setDragStartMouseY(event.pageY);
    setIsBeingDragged(true);
  };

  const onDragEnd = (event: DragEvent) => {
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

    destroyPlaceholderElement();
    removeDraggableStyle();
    setIsBeingDragged(false);
    setDragStartMouseY(0);
    setWasDroppedRecently(true);
  };

  const onDrag = (event: DragEvent) => {
    const currentMouseY = event.pageY;
    const mouseYDelta = dragStartMouseY - currentMouseY;

    const targetAsHTMLElement = event.target as HTMLElement;
    targetAsHTMLElement.style.top = `${-mouseYDelta}px`;
  };

  useEffect(() => {
    if (!wasDroppedRecently) return;

    const timerId = setTimeout(() => {
      setWasDroppedRecently(false);
    }, wasDroppedDuration);

    timerIdRef.current = timerId;

    return () => {
      clearTimeout(timerIdRef.current);
    };
  }, [wasDroppedRecently]);

  return (
    <DraggableContext.Provider
      value={{ isBeingDragged, wasDroppedRecently, setIsDraggable }}
    >
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
