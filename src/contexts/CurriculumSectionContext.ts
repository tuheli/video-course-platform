import { createContext } from 'react';
import { ICurriculumSection } from '../features/courseDraftsSlice';

export type EditableItem = 'addLecture';

interface CurriculumSectionContextProps {
  index: number;
  courseDraftId: string;
  curriculumSection: ICurriculumSection;
  editingItemType: EditableItem | undefined;
  setEditingItemType: (itemType: EditableItem | undefined) => void;
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
  editingItemType: undefined,
  setEditingItemType: () => {},
  index: 0,
};

export const CurriculumSectionContext =
  createContext<CurriculumSectionContextProps>(defaultValue);
