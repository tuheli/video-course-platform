import { createContext } from 'react';

interface DraggableContextProps {
  setIsDraggable: (isDraggable: boolean) => void;
}

export const DraggableContext = createContext<DraggableContextProps>({
  setIsDraggable: () => {},
});
