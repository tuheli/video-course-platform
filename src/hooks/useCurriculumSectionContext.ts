import { useContext } from 'react';
import { CurriculumSectionContext } from '../contexts/CurriculumSectionContext';

export const useCurriculumSectionContext = () => {
  const context = useContext(CurriculumSectionContext);
  return context;
};
