import { useContext } from 'react';
import { LectureContext } from '../contexts/LectureContext';

export const useLectureContext = () => {
  const context = useContext(LectureContext);

  if (context === undefined) {
    throw new Error(
      'useLectureContext must be used within a LectureContext provider'
    );
  }

  return context;
};
