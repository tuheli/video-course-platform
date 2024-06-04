import { createContext } from 'react';
import { Lesson } from '../features/courseDraftsSlice';

interface LectureContextProps {
  lecture: Lesson;
}

export const LectureContext = createContext<LectureContextProps>({
  lecture: { id: '', name: '', orderIndex: -1 },
});
