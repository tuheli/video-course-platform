import { useEffect, useRef, useState } from 'react';
import { useDragAndDropContext } from './useDragAndDropContext';
import {
  ItemWithOrderIndex,
  giveItemsOrderIndicies,
} from '../drag-and-drop/utils';
import { DraggableContext } from './DraggableContext';

interface Reorderable {
  id: string;
  yPosition: number;
}

interface DraggableProps {
  dataId: string;
  allowedDropzoneTag: string;
  children: React.ReactNode;
  changeOrder: (newOrder: ItemWithOrderIndex[]) => void;
}

interface Position {
  x: number | null;
  y: number | null;
}

export const Draggable = ({
  dataId,
  allowedDropzoneTag,
  children,
  changeOrder,
}: DraggableProps) => {
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const mouseOffset = useRef<Position>({
    x: null,
    y: null,
  });
  const mousePosition = useRef<Position>({ x: null, y: null });
  const tickIntervalId = useRef<number | null>(null);
  const selfRef = useRef<HTMLDivElement>(null);
  const scrollOffset = useRef<number>(0);
  const { currentlyDraggedItemId, setCurrentlyDraggedItemId } =
    useDragAndDropContext();

  scrollOffset.current = window.scrollY;

  const updateMouseOffset = (event: MouseEvent) => {
    if (!selfRef.current) return;
    const rect = selfRef.current.getBoundingClientRect();
    const xDifference = rect.left - event.clientX;
    const yDifference = rect.top - event.clientY;
    mouseOffset.current = { x: xDifference, y: yDifference };
  };

  const onMouseDown = (event: React.MouseEvent) => {
    if (!isDraggable) return;

    event.preventDefault();
    event.stopPropagation();

    updateMouseOffset(event.nativeEvent);
    updateMousePosition(event.nativeEvent);
    startDrag(event.nativeEvent);
  };

  const updateMousePosition = (event: MouseEvent) => {
    const eventMousePosition = {
      x: event.pageX,
      y: event.pageY - window.scrollY,
    };

    mousePosition.current = eventMousePosition;
  };

  const startDrag = (event: MouseEvent) => {
    if (currentlyDraggedItemId !== null) return;

    document.body.style.overflowX = 'hidden';

    setCurrentlyDraggedItemId(dataId);
    createDragImage(event);

    if (tickIntervalId.current) {
      clearTimeout(tickIntervalId.current);
    }

    tickIntervalId.current = setInterval(() => {
      onDragTick();
    }, 100);

    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mousemove', onDragMouseMove);
    window.addEventListener('scroll', onScroll);
  };

  const createDragImage = (event: MouseEvent) => {
    if (!selfRef.current) return;
    if (!mouseOffset.current.x || !mouseOffset.current.y) return;

    const dragImage = selfRef.current.cloneNode(true) as HTMLElement;

    dragImage.id = 'drag-image';

    dragImage.style.pointerEvents = 'none';

    dragImage.style.zIndex = '1000';

    dragImage.style.position = 'absolute';
    dragImage.style.top = `${event.pageY + mouseOffset.current.y}px`;
    dragImage.style.left = `${event.pageX + mouseOffset.current.x}px`;

    dragImage.style.width = `${selfRef.current.offsetWidth}px`;
    dragImage.style.height = `${selfRef.current.offsetHeight}px`;

    document.body.appendChild(dragImage);
  };

  const onDragMouseMove = (event: MouseEvent) => {
    updateMousePosition(event);
    updateDragImagePosition(event);
  };

  const moveVertically = (nextTopPosition: number, element: HTMLElement) => {
    element.style.top = `${nextTopPosition}px`;
    return;
  };

  const moveHorizontally = (nextLeftPosition: number, element: HTMLElement) => {
    element.style.left = `${nextLeftPosition}px`;
  };

  const updateDragImagePosition = (event: MouseEvent) => {
    const dragImage = document.getElementById('drag-image');

    if (!dragImage) return;
    if (!mouseOffset.current.x || !mouseOffset.current.y) return;

    if (event.type === 'scroll') {
      const scrollDelta = window.scrollY - scrollOffset.current;
      scrollOffset.current = window.scrollY;

      const currentTop = parseFloat(dragImage.style.top);
      const nextTopPosition = currentTop + scrollDelta;

      moveVertically(nextTopPosition, dragImage);
    } else {
      const nextTopPosition = event.pageY + mouseOffset.current.y;
      moveVertically(nextTopPosition, dragImage);

      const nextLeftPosition = event.pageX + mouseOffset.current.x;
      moveHorizontally(nextLeftPosition, dragImage);
    }
  };

  const onScroll = (event: any) => {
    updateMousePosition(event);
    updateDragImagePosition(event);
  };

  const onDragTick = () => {
    const dropzoneUnderneath = getDropzoneUnderneath();
    if (!dropzoneUnderneath) return;

    const itemsInDropzone = getItemsInDropzone(dropzoneUnderneath);
    const sortedItems = sortByYPosition(itemsInDropzone);
    const shouldReorder = isOrderChanged(itemsInDropzone, sortedItems);

    if (!shouldReorder) return;

    const newOrder = giveItemsOrderIndicies(itemsInDropzone, sortedItems);
    changeOrder(newOrder);
  };

  const isOrderChanged = (
    oldOrder: Array<{ id: string }>,
    newOrder: Array<{ id: string }>
  ) => {
    return oldOrder.some((oldItem, index) => oldItem.id !== newOrder[index].id);
  };

  const getDropzoneUnderneath = () => {
    const dropzones = document.querySelectorAll(
      `.dropzone-${allowedDropzoneTag}`
    );

    const dropzoneUnderneath = Array.from(dropzones).find((dropzone) => {
      const dropzoneRect = dropzone.getBoundingClientRect();
      return (
        mousePosition.current.x &&
        mousePosition.current.y &&
        mousePosition.current.x > dropzoneRect.left &&
        mousePosition.current.x < dropzoneRect.right &&
        mousePosition.current.y > dropzoneRect.top &&
        mousePosition.current.y < dropzoneRect.bottom
      );
    });

    return dropzoneUnderneath || null;
  };

  const getItemsInDropzone = (dropzone: Element): Reorderable[] => {
    if (!mousePosition.current || mousePosition.current.y === null) return [];
    if (!mouseOffset.current || mouseOffset.current.y === null) return [];

    const items = dropzone.querySelectorAll(`.draggable-${allowedDropzoneTag}`);

    const itemsArray = Array.from(items).map((item) => {
      const rect = item.getBoundingClientRect();
      const id = item.id;
      const yPosition =
        id === dataId
          ? mousePosition.current.y! + mouseOffset.current.y! + rect.height / 2
          : rect.top + rect.height / 2;

      return {
        id,
        yPosition,
      };
    });

    return itemsArray;
  };

  const sortByYPosition = (array: Reorderable[]) => {
    const copy = [...array];
    copy.sort((a, b) => a.yPosition - b.yPosition);
    return copy;
  };

  const endDrag = () => {
    window.removeEventListener('mouseup', endDrag);
    window.removeEventListener('mousemove', onDragMouseMove);
    window.removeEventListener('scroll', onScroll);

    const dragImage = document.getElementById('drag-image');
    dragImage?.remove();

    if (tickIntervalId.current) {
      clearInterval(tickIntervalId.current);
    }

    mousePosition.current = { x: null, y: null };
    setCurrentlyDraggedItemId(null);

    document.body.style.overflowX = '';
  };

  useEffect(() => {
    return () => {
      if (!tickIntervalId.current) return;
      clearInterval(tickIntervalId.current);
    };
  }, []);

  return (
    <div
      id={dataId}
      ref={selfRef}
      className={`draggable-${allowedDropzoneTag}`}
      onMouseDown={onMouseDown}
    >
      <DraggableContext.Provider
        value={{
          setIsDraggable,
        }}
      >
        {children}
      </DraggableContext.Provider>
    </div>
  );
};
