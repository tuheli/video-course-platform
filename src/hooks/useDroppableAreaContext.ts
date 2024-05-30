import { useContext } from 'react';
import { DroppableAreaContext } from '../contexts/DroppableAreaContext';

export const useDroppableAreaContext = () => {
  const context = useContext(DroppableAreaContext);
  return context;
};
