import { useEffect, useRef, useState } from 'react';
import { DragAndDropContext } from './DragAndDropContext';
import { useDragAndDropContext } from './useDragAndDropContext';

const dataIds = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

export const DragDropV2 = () => {
  const [currentlyDraggedItemId, setCurrentlyDraggedItemId] = useState<
    string | null
  >(null);

  console.log('currentlyDraggedItemId', currentlyDraggedItemId);

  return (
    <DragAndDropContext.Provider
      value={{
        currentlyDraggedItemId,
        setCurrentlyDraggedItemId,
      }}
    >
      <div
        style={{
          height: 'calc(100vh + 1000px)',
          backgroundColor: 'grey',
          margin: '100px',
          padding: '10px',
          justifyContent: 'space-around',
        }}
      >
        <Dropzone allowedDropzoneTag="lecture">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {dataIds.map((dataId) => (
              <Draggable
                key={dataId}
                dataId={dataId}
                allowedDropzoneTag="lecture"
              />
            ))}
          </div>
        </Dropzone>
      </div>
    </DragAndDropContext.Provider>
  );
};

interface DropzoneProps {
  allowedDropzoneTag: string;
  children?: React.ReactNode;
}

const Dropzone = ({ allowedDropzoneTag, children }: DropzoneProps) => {
  return (
    <div
      className={`dropzone-${allowedDropzoneTag}`}
      style={{
        backgroundColor: 'lightgreen',
        width: '400px',
        height: '400px',
      }}
    >
      {children}
    </div>
  );
};

interface Reorderable {
  id: string;
  yPosition: number;
}

interface DraggableProps {
  dataId: string;
  allowedDropzoneTag: string;
}

interface Position {
  x: number | null;
  y: number | null;
}

const Draggable = ({ dataId, allowedDropzoneTag }: DraggableProps) => {
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
    event.preventDefault();
    event.stopPropagation();

    updateMouseOffset(event.nativeEvent);
    updateMousePosition(event.nativeEvent);
    startDrag(event.nativeEvent);
  };

  const updateMousePosition = (event: MouseEvent) => {
    const eventMousePosition = {
      x: event.pageX,
      y: event.pageY,
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

    dragImage.style.position = 'absolute';
    dragImage.style.top = `${event.pageY + mouseOffset.current.y}px`;
    dragImage.style.left = `${event.pageX + mouseOffset.current.x}px`;

    dragImage.style.backgroundColor = 'red';
    dragImage.style.zIndex = '1000';

    document.body.appendChild(dragImage);
  };

  const onDragMouseMove = (event: MouseEvent) => {
    updateMousePosition(event);
    updateDragImagePosition(event);
  };

  const moveVertically = (nextTopPosition: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();

    const isMovingDown = nextTopPosition > parseFloat(element.style.top);
    const canMoveDown = rect.bottom < window.innerHeight - 10;

    const isMovingUp = nextTopPosition < parseFloat(element.style.top);
    const canMoveUp = rect.top > 10;

    element.style.top = `${nextTopPosition}px`;
    return;

    if (isMovingDown && canMoveDown) {
      element.style.top = `${nextTopPosition}px`;
    } else if (isMovingUp && canMoveUp) {
      element.style.top = `${nextTopPosition}px`;
    }
  };

  const moveHorizontally = (nextLeftPosition: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();

    const isMovingLeft = nextLeftPosition < parseFloat(element.style.left);
    const canMoveLeft = rect.left > 10;

    const isMovingRight = nextLeftPosition > parseFloat(element.style.left);
    const canMoveRight = rect.right < window.innerWidth - 28;

    element.style.left = `${nextLeftPosition}px`;
    return;

    if (isMovingLeft && canMoveLeft) {
      element.style.left = `${nextLeftPosition}px`;
    } else if (isMovingRight && canMoveRight) {
      element.style.left = `${nextLeftPosition}px`;
    }
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
      style={{
        backgroundColor: 'orange',
        width: '100px',
        height: '100px',
      }}
    ></div>
  );
};
