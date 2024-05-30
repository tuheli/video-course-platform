import { createContext } from 'react';

interface DragAndDropContextState {
  itemsState: Array<{ id: string }>;
  changeOrder: (newOrder: Array<{ id: string; orderIndex: number }>) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextState>({
  itemsState: [],
  changeOrder: () => {},
});
