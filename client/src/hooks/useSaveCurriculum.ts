import {
  getLectureDescriptionLocalStorageKey,
  getStringSlateEditorStateFromLocalStorageOrDefault,
} from '../components/text-editor/utils';
import { useUpdateCurriculumSectionsMutation } from '../features/apiSlice';
import { CourseDraft } from '../features/courseDraftsSlice';

// NOTE: Lesson description is rich text
// and stored in localstorage so its
// not found from redux store.

export const useSaveCurriculum = () => {
  const [updateCurriculumSections] = useUpdateCurriculumSectionsMutation();

  const saveCurriculum = async (courseDraft: CourseDraft) => {
    if (!courseDraft) return;
    try {
      const entries = courseDraft.courseContent.curriculum.map(
        (section: any) => {
          const sectionEntry = {
            id: section.id,
            title: section.title,
            learningObjective: section.learningObjective,
            orderIndex: section.orderIndex,
            lessons: section.lessons.map((lesson: any) => {
              const descriptionKey = getLectureDescriptionLocalStorageKey(
                courseDraft.id,
                section.id,
                lesson.id
              );

              const description =
                getStringSlateEditorStateFromLocalStorageOrDefault(
                  descriptionKey
                );

              return {
                id: lesson.id,
                name: lesson.name,
                description,
                orderIndex: lesson.orderIndex,
              };
            }),
          };
          return sectionEntry;
        }
      );

      await updateCurriculumSections({
        courseDraftId: courseDraft.id,
        entries,
      }).unwrap();
    } catch (error) {
      throw error;
    }
  };

  return { saveCurriculum };
};
