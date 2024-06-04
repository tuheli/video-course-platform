import { createContext } from 'react';

interface DragAndDropContextState {
  itemsState: Array<{ id: string }>;
  isSomethingDragged?: boolean;
  changeOrder: (newOrder: Array<{ id: string; orderIndex: number }>) => void;
  setIsSomethingDragged?: (isSomethingDragged: boolean) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextState>({
  itemsState: [],
  isSomethingDragged: false,
  changeOrder: () => {},
  setIsSomethingDragged: () => {},
});
