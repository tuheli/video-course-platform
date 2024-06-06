import { createContext } from 'react';

interface DragAndDropContextProps {
  currentlyDraggedItemId: string | null;
  setCurrentlyDraggedItemId: (id: string | null) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  currentlyDraggedItemId: null,
  setCurrentlyDraggedItemId: () => {},
});
