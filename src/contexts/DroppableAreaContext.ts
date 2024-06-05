import { createContext } from 'react';

interface DroppableAreaContextState {
  setDraggedItemId: (id: string) => void;
  setDraggedItemCenterY: (centerY: number | undefined) => void;
}

export const DroppableAreaContext = createContext<DroppableAreaContextState>({
  setDraggedItemId: () => {},
  setDraggedItemCenterY: () => {},
});
