import { useContext } from 'react';
import { DraggableContext } from '../contexts/DraggableContext';

export const useDraggableContext = () => {
  const contextState = useContext(DraggableContext);
  return contextState;
};
