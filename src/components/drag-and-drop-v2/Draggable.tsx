import { useEffect, useRef } from 'react';

export const DragDropV2 = () => {
  return (
    <div
      style={{
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
          <Draggable dataId="1" allowedDropzoneTag="lecture" />
          <Draggable dataId="2" allowedDropzoneTag="lecture" />
          <Draggable dataId="3" allowedDropzoneTag="lecture" />
        </div>
      </Dropzone>
    </div>
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
      x: event.clientX,
      y: event.clientY,
    };

    mousePosition.current = eventMousePosition;
  };

  const startDrag = (event: MouseEvent) => {
    createDragImage(event);

    if (tickIntervalId.current) {
      clearTimeout(tickIntervalId.current);
    }

    tickIntervalId.current = setInterval(() => {
      onDragTick();
    }, 100);

    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mousemove', onDragMouseMove);
  };

  const createDragImage = (event: MouseEvent) => {
    if (!selfRef.current) return;
    if (!mouseOffset.current.x || !mouseOffset.current.y) return;

    const dragImage = selfRef.current.cloneNode(true) as HTMLElement;

    dragImage.id = 'drag-image';
    dragImage.style.pointerEvents = 'none';

    dragImage.style.position = 'absolute';
    dragImage.style.top = `${event.clientY + mouseOffset.current.y}px`;
    dragImage.style.left = `${event.clientX + mouseOffset.current.x}px`;

    dragImage.style.backgroundColor = 'red';
    dragImage.style.zIndex = '1000';

    document.body.appendChild(dragImage);
  };

  const onDragMouseMove = (event: MouseEvent) => {
    updateMousePosition(event);

    const dragImage = document.getElementById('drag-image');

    if (!dragImage) return;
    if (!mouseOffset.current.x || !mouseOffset.current.y) return;

    dragImage.style.top = `${event.clientY + mouseOffset.current.y}px`;
    dragImage.style.left = `${event.clientX + mouseOffset.current.x}px`;
  };

  const onDragTick = () => {
    const dropzoneUnderneath = getDropzoneUnderneath();
    if (!dropzoneUnderneath) return;

    const itemsInDropzone = getItemsInDropzone(dropzoneUnderneath);
    itemsInDropzone.forEach((element) => {
      console.log('element', element);
    });
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

    const dragImage = document.getElementById('drag-image');
    dragImage?.remove();

    if (!tickIntervalId.current) return;
    clearInterval(tickIntervalId.current);
    mousePosition.current = { x: null, y: null };
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
