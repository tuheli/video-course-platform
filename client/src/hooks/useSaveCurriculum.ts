import { useUpdateCurriculumSectionsMutation } from '../features/apiSlice';
import { CourseDraft } from '../features/courseDraftsSlice';

export const useSaveCurriculum = () => {
  const [updateCurriculumSections] = useUpdateCurriculumSectionsMutation();

  const saveCurriculum = async (courseDraft: CourseDraft) => {
    if (!courseDraft) return;
    try {
      const entries = courseDraft.courseContent.curriculum.map(
        (section: any) => {
          const entry = {
            id: section.id,
            title: section.title,
            learningObjective: section.learningObjective,
            orderIndex: section.orderIndex,
            lessons: section.lessons.map((lesson: any) => {
              return {
                id: lesson.id,
                name: lesson.name,
                description: lesson.description,
                orderIndex: lesson.orderIndex,
              };
            }),
          };
          return entry;
        }
      );

      await updateCurriculumSections({
        courseDraftId: courseDraft.id,
        entries,
      });
    } catch (error) {
      throw error;
    }
  };

  return { saveCurriculum };
};
