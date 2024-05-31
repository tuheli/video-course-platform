import { useContext } from 'react';
import { CurriculumSectionContext } from '../contexts/CurriculumSectionContext';

export const useCurriculumSectionContext = () => {
  const context = useContext(CurriculumSectionContext);

  if (!context) {
    throw new Error(
      'useCurriculumSectionContext must be used within a CurriculumSectionProvider'
    );
  }

  return context;
};
