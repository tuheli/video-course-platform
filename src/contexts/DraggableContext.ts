import { createContext } from 'react';

interface DraggableContextState {
  isBeingDragged: boolean;
  setIsDraggable: (isDraggable: boolean) => void;
}

export const DraggableContext = createContext<DraggableContextState>({
  isBeingDragged: false,
  setIsDraggable: () => null,
});
