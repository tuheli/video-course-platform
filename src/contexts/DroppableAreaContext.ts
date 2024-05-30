import { createContext } from 'react';

interface DroppableAreaContextState {
  tickUpdateOrder: (draggedItemId: string, dragImageCenterY: number) => void;
}

export const DroppableAreaContext = createContext<DroppableAreaContextState>({
  tickUpdateOrder: () => {},
});
