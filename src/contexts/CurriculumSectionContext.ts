import { createContext } from 'react';
import { ICurriculumSection } from '../features/courseDraftsSlice';

export type EditableItemType = 'addLecture';

interface CurriculumSectionContextProps {
  index: number;
  courseDraftId: string;
  curriculumSection: ICurriculumSection;
  editingItemType: EditableItemType | undefined;
  isOptionsAnimationEnabled: boolean;
  setIsOptionsAnimationEnabled: (isEnabled: boolean) => void;
  setEditingItemType: (itemType: EditableItemType | undefined) => void;
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
  index: 0,
  isOptionsAnimationEnabled: true,
  setIsOptionsAnimationEnabled: () => {},
  setEditingItemType: () => {},
};

export const CurriculumSectionContext =
  createContext<CurriculumSectionContextProps>(defaultValue);
