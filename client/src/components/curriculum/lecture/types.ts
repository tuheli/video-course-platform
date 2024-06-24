import { Lesson } from '../../../features/courseDraftsSlice';

export interface LectureProps {
  lecture: Lesson;
  index: number;
  courseDraftId: number;
  sectionId: number;
}
