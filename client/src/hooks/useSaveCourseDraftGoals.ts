import { useUpdateCourseDraftGoalsMutation } from '../features/apiSlice';
import { CourseDraft } from '../features/courseDraftsSlice';

export const useSaveCourseDraftGoals = () => {
  const [updateCourseDraftGoals] = useUpdateCourseDraftGoalsMutation();

  const saveCourseDraftGoals = async (course: CourseDraft) => {
    try {
      const requestBody = {
        courseDraftId: course.id,
        learningObjectives: course.courseContent.learningObjectives,
        prerequisites: course.courseContent.prerequisites,
        intendedLearners: course.courseContent.intendedLearners,
      };

      await updateCourseDraftGoals(requestBody).unwrap();
    } catch (error) {
      throw error;
    }
  };

  return { saveCourseDraftGoals };
};
