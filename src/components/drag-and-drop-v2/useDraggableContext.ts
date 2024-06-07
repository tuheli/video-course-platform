import { useContext } from 'react';
import { DraggableContext } from './DraggableContext';

export const useDraggableContext = () => {
  const context = useContext(DraggableContext);
  return context;
};
