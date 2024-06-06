import { useContext } from 'react';
import { DragAndDropContext } from './DragAndDropContext';

export const useDragAndDropContext = () => {
  const context = useContext(DragAndDropContext);

  return context;
};
