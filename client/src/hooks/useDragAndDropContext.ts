import { useContext } from 'react';
import { DragAndDropContext } from '../contexts/DragAndDropContext';

export const useDragAndDropContext = () => {
  const contextState = useContext(DragAndDropContext);
  return contextState;
};
