import { createContext } from 'react';

interface DraggableContextState {
  isBeingDragged: boolean;
  wasDroppedRecently: boolean;
  setIsDraggable: (isDraggable: boolean) => void;
}

export const DraggableContext = createContext<DraggableContextState>({
  isBeingDragged: false,
  wasDroppedRecently: false,
  setIsDraggable: () => {},
});
