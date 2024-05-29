import { ReorderableByYPosition } from './DragAndDropTest';

export interface IDraggable extends ReorderableByYPosition {
  id: string;
}

const draggableData: IDraggable[] = Array.from({ length: 3 }, (_, k) => {
  return {
    id: `${k}`,
    yPosition: 0,
  };
});

export const getDraggableData = () => draggableData;
