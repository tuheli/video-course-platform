import { createContext } from 'react';
import { IDraggable } from '../components/drag-and-drop/Draggable';

interface DragAndDropContextState {
  itemsState: Array<{ id: string }>;
  changeOrder: (draggables: IDraggable[]) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextState>({
  itemsState: [],
  changeOrder: () => {},
});
