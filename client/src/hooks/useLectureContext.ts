import { useContext } from 'react';
import { LectureContext } from '../contexts/LectureContext';

export const useLectureContext = () => {
  const context = useContext(LectureContext);
  return context;
};
