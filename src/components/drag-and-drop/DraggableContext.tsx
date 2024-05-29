import { createContext } from 'react';
import { IDraggable } from './draggableData';

interface ContextState {
  state: IDraggable[];
  changeOrder: (draggables: IDraggable[]) => void;
}

export const DraggableContext = createContext<ContextState>({
  state: [],
  changeOrder: () => null,
});
