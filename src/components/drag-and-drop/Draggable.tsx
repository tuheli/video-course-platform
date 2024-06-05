import { DragEvent, useEffect, useRef, useState } from 'react';
import { DraggableContext } from '../../contexts/DraggableContext';
import { wasDroppedDuration } from './common';
import { useDragAndDropContext } from '../../hooks/useDragAndDropContext';
import { Box, SxProps } from '@mui/material';
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
  classNameId: string;
  children: React.ReactNode;
  sx?: SxProps;
}

export const Draggable = ({
  id,
  classNameId,
  children,
  sx,
}: DraggableProps) => {
  const [wasDroppedRecently, setWasDroppedRecently] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const { setIsSomethingDragged } = useDragAndDropContext();
  const { setDraggedItemId, setDraggedItemCenterY } = useDroppableAreaContext();
  const selfRef = useRef<HTMLDivElement>(null);
  const wasDroppedRecentlyTimerRef = useRef(0);

  const onDragStart = (event: DragEvent) => {
    event.stopPropagation();

    clearTimeout(wasDroppedRecentlyTimerRef.current);
    setWasDroppedRecently(false);
    setIsBeingDragged(true);
    setIsSomethingDragged && setIsSomethingDragged(true);
    setDraggedItemId(id);
  };

  const onDragEnd = (event: DragEvent) => {
    event.stopPropagation();

    setIsBeingDragged(false);
    setWasDroppedRecently(true);
    setIsSomethingDragged && setIsSomethingDragged(false);
    setDraggedItemId('');
    setDraggedItemCenterY(undefined);
  };

  const onDrag = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const itemCenterY = getAbsoluteYCenterPosition(event.target as HTMLElement);
    setDraggedItemCenterY(itemCenterY);
  };

  const onDrop = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    if (!wasDroppedRecently) return;

    const timerId = setTimeout(() => {
      setWasDroppedRecently(false);
    }, wasDroppedDuration);

    wasDroppedRecentlyTimerRef.current = timerId;

    return () => {
      clearTimeout(wasDroppedRecentlyTimerRef.current);
    };
  }, [wasDroppedRecently]);

  return (
    <DraggableContext.Provider
      value={{ isBeingDragged, wasDroppedRecently, setIsDraggable }}
    >
      <Box
        ref={selfRef}
        draggable={isDraggable}
        id={id}
        className={`draggable-${classNameId}`}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        onDrag={onDrag}
        sx={sx}
      >
        {children}
      </Box>
    </DraggableContext.Provider>
  );
};
