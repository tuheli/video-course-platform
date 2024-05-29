import { createContext } from 'react';
import { IDraggable } from '../components/drag-and-drop/Draggable';

interface DragAndDropContextState {
  changeOrder: (draggables: IDraggable[]) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextState>({
  changeOrder: () => null,
});
