import { DragEvent, useEffect, useRef, useState } from 'react';
import { DraggableContext } from '../../contexts/DraggableContext';
import { wasDroppedDuration } from './common';
import { useDroppableAreaContext } from '../../hooks/useDroppableAreaContext';
import { getAbsoluteYCenterPosition } from './utils';
import { useDragAndDropContext } from '../../hooks/useDragAndDropContext';

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
  const timerIdRef = useRef(0);
  const { tickUpdateOrder } = useDroppableAreaContext();
  const { setIsSomethingDragged } = useDragAndDropContext();
  const selfRef = useRef<HTMLDivElement>(null);

  const onDragStart = (event: React.DragEvent) => {
    // Border animation can cause positioning issues
    // for the drag image. So we set it manually.
    const setDragImage = () => {
      if (!selfRef.current) return;

      const localMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };

      const selfBoundingRect = selfRef.current?.getBoundingClientRect();

      const selfPosition = {
        x: selfBoundingRect.left,
        y: selfBoundingRect.top,
      };

      const difference = {
        x: localMousePosition.x - selfPosition.x,
        y: localMousePosition.y - selfPosition.y,
      };

      event.dataTransfer.setDragImage(
        selfRef.current as HTMLElement,
        difference.x,
        difference.y
      );
    };

    setDragImage();
    clearTimeout(timerIdRef.current);
    setWasDroppedRecently(false);
    setIsBeingDragged(true);
    setIsSomethingDragged && setIsSomethingDragged(true);
  };

  const onDragEnd = () => {
    setIsBeingDragged(false);
    setWasDroppedRecently(true);
    setIsSomethingDragged && setIsSomethingDragged(false);
  };

  const onDrag = (event: DragEvent) => {
    const targetAsHTMLElement = event.target as HTMLElement;
    const centerY = getAbsoluteYCenterPosition(targetAsHTMLElement);

    const centerOffset = centerY - event.pageY;
    const imagePosition = centerY - centerOffset;

    tickUpdateOrder(id, imagePosition);
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
        ref={selfRef}
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
