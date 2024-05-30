import { DragEvent, useEffect, useRef, useState } from 'react';
import { DraggableContext } from '../../contexts/DraggableContext';
import { wasDroppedDuration } from './common';
import { useDroppableAreaContext } from '../../hooks/useDroppableAreaContext';
import { getAbsoluteYCenterPosition } from './utils';

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

  const onDragStart = () => {
    clearTimeout(timerIdRef.current);
    setWasDroppedRecently(false);
    setIsBeingDragged(true);
  };

  const onDragEnd = () => {
    setIsBeingDragged(false);
    setWasDroppedRecently(true);
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
