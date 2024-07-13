import { createContext } from 'react';

interface DragAndDropContextState {
  itemsState: Array<{ id: number }>;
  changeOrder: (newOrder: Array<{ id: number; orderIndex: number }>) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextState>({
  itemsState: [],
  changeOrder: () => {},
});
