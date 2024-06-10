import { Lesson } from '../../../features/courseDraftsSlice';

export interface LectureProps {
  lecture: Lesson;
  index: number;
  courseDraftId: string;
  sectionId: string;
}
