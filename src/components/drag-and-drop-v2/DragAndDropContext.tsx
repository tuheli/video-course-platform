import { createContext } from 'react';
import { ItemWithOrderIndex } from '../drag-and-drop/utils';

interface DragAndDropContextProps {
  currentlyDraggedItemId: string | null;
  setCurrentlyDraggedItemId: (id: string | null) => void;
  changeOrder: (newOrder: ItemWithOrderIndex[]) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  currentlyDraggedItemId: null,
  setCurrentlyDraggedItemId: () => {},
  changeOrder: () => {},
});
