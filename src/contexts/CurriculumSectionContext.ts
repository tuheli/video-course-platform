import { createContext } from 'react';
import { ICurriculumSection } from '../features/courseDraftsSlice';

interface CurriculumSectionContextProps {
  index: number;
  courseDraftId: string;
  curriculumSection: ICurriculumSection;
}

const defaultValue: CurriculumSectionContextProps = {
  courseDraftId: '',
  curriculumSection: {
    id: '',
    title: '',
    learningObjective: '',
    lessons: [],
    orderIndex: -1,
  },
  index: 0,
};

export const CurriculumSectionContext =
  createContext<CurriculumSectionContextProps>(defaultValue);
