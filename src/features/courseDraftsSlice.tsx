import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CourseType,
  KnownCourseCategory,
  TimeAvailablePerWeek,
} from './courseCreationSlice';

export interface CourseDraft {
  id: string;
  creatorEmail: string; // Replaces id now before database exists
  courseType: CourseType;
  courseTitle: string;
  courseCategory: KnownCourseCategory;
  creatorTimeAvailablePerWeek: TimeAvailablePerWeek;
  isPublic: boolean;
  isSubmissionProcessCompleted: boolean;
  courseContent: CourseContent;
}

export interface TextWithId {
  id: string;
  text: string;
}

interface CourseContent {
  // NOTE: Remember to update getCourseDraftProgressValue when adding more properties
  learningObjectives: TextWithId[];
  prerequisites: TextWithId[];
  intendedLearners: TextWithId[];
  videoContentLengthSeconds: number;
}

export type NewCourseDraftEntry = Omit<
  CourseDraft,
  'id' | 'isPublic' | 'isSubmissionProcessCompleted' | 'courseContent'
>;

export const getCourseDraftProgressValue = (courseDraft: CourseDraft) => {
  const { learningObjectives, prerequisites, intendedLearners } =
    courseDraft.courseContent;

  const minValue = 2; // Lets always show some progress for the slider to be visible
  const objectivesCount = 3;
  let completedObjectives = 0;

  completedObjectives += learningObjectives.length > 0 ? 1 : 0;
  completedObjectives += prerequisites.length > 0 ? 1 : 0;
  completedObjectives += intendedLearners.length > 0 ? 1 : 0;

  if (completedObjectives === 0) return minValue;

  const progressValue = (completedObjectives / objectivesCount) * 100;

  if (progressValue > 100) return 100;
  if (progressValue < 0) return minValue;
  return progressValue;
};

const getTextWithIdArray = (length: number): TextWithId[] => {
  return Array.from({ length }, (_, k) => {
    return {
      id: `${k}`,
      text: '',
    };
  });
};

const getInitialLearningObjectives = () => {
  return getTextWithIdArray(4);
};

const getInitialPrerequisites = () => {
  return getTextWithIdArray(1);
};

const getInitialIntendedLearners = () => {
  return getTextWithIdArray(1);
};

const initialState: CourseDraft[] = [
  {
    id: '1',
    creatorEmail: 'elias.test@gmail.com',
    courseType: 'course',
    courseTitle: 'Technical animation for modular video game characters',
    courseCategory: KnownCourseCategory.Development,
    creatorTimeAvailablePerWeek: TimeAvailablePerWeek.IHaveLotsOfFlexibility,
    isPublic: true,
    isSubmissionProcessCompleted: false,
    courseContent: {
      learningObjectives: [
        {
          id: '1',
          text: 'Student understands fbx file format and its use in game development',
        },
        {
          id: '2',
          text: 'Student understands why rigs are used, what they are and what they do',
        },
        {
          id: '3',
          text: 'Student understands real-time animation functionalities in Unity and Unreal Engine',
        },
        {
          id: '4',
          text: 'Student is able to utilize real-time animation in Unity and Unreal Engine',
        },
        {
          id: '5',
          text: 'Student understands 3D spaces and can effectively utilize them in rig creation, modification and real-time animation',
        },
        {
          id: '6',
          text: 'Student understands the importance of non-destructive workflows in 3D animation',
        },

        {
          id: '7',
          text: 'Student is able to use and customize constraints applied to animation rigs',
        },
        {
          id: '8',
          text: 'Student is able to create a modular rig for any given 3D model',
        },
        {
          id: '9',
          text: 'Student understands export and import process of fbx files for Unity and Unreal Engine',
        },
      ],
      prerequisites: getInitialPrerequisites(),
      intendedLearners: [
        {
          id: '1',
          text: 'Game developers',
        },
        {
          id: '2',
          text: '3D artists',
        },
        {
          id: '3',
          text: 'Animators',
        },
        {
          id: '4',
          text: 'Programmers',
        },
      ],
      videoContentLengthSeconds: 158,
    },
  },
  {
    id: '2',
    creatorEmail: 'alice.test@gmail.com',
    courseType: 'course',
    courseTitle: 'Marketing for small businesses',
    courseCategory: KnownCourseCategory.Business,
    creatorTimeAvailablePerWeek: TimeAvailablePerWeek.ImVeryBusy,
    isPublic: true,
    isSubmissionProcessCompleted: false,
    courseContent: {
      learningObjectives: getInitialLearningObjectives(),
      prerequisites: getInitialPrerequisites(),
      intendedLearners: [
        {
          id: '1',
          text: 'Small business owners',
        },
        {
          id: '2',
          text: 'Entrepreneurs',
        },
      ],
      videoContentLengthSeconds: 0,
    },
  },
  {
    id: '3',
    creatorEmail: 'elias.test@gmail.com',
    courseType: 'course',
    courseTitle: 'Another course for testing purposes',
    courseCategory: KnownCourseCategory.Design,
    creatorTimeAvailablePerWeek: TimeAvailablePerWeek.IHaveLotsOfFlexibility,
    isPublic: true,
    isSubmissionProcessCompleted: false,
    courseContent: {
      learningObjectives: getInitialLearningObjectives(),
      prerequisites: getInitialPrerequisites(),
      intendedLearners: getInitialIntendedLearners(),
      videoContentLengthSeconds: 0,
    },
  },
  {
    id: '4',
    creatorEmail: 'elias.test@gmail.com',
    courseType: 'course',
    courseTitle:
      'A Third Course for Testing Purposes very long title to cause typography being clamped at 3 lines',
    courseCategory: KnownCourseCategory.Business,
    creatorTimeAvailablePerWeek: TimeAvailablePerWeek.ImVeryBusy,
    isPublic: true,
    isSubmissionProcessCompleted: false,
    courseContent: {
      learningObjectives: getInitialLearningObjectives(),
      prerequisites: getInitialPrerequisites(),
      intendedLearners: getInitialIntendedLearners(),
      videoContentLengthSeconds: 0,
    },
  },
];

const slice = createSlice({
  name: 'courseDrafts',
  initialState,
  reducers: {
    createdCourseDraft: (state, action: PayloadAction<NewCourseDraftEntry>) => {
      const id = crypto.randomUUID();
      const newCourseDraft: CourseDraft = {
        ...action.payload,
        id,
        isPublic: true,
        isSubmissionProcessCompleted: false,
        courseContent: {
          intendedLearners: getInitialIntendedLearners(),
          learningObjectives: getInitialLearningObjectives(),
          prerequisites: getInitialPrerequisites(),
          videoContentLengthSeconds: 0,
        },
      };
      state.push(newCourseDraft);
    },
    updatedLearningObjective: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        learningObjectiveId: string;
        text: string;
      }>
    ) => {
      const learningObjective = state
        .find(({ id }) => id === action.payload.courseDraftId)
        ?.courseContent.learningObjectives.find(
          ({ id }) => id === action.payload.learningObjectiveId
        );

      if (!learningObjective) return;

      learningObjective.text = action.payload.text;
    },
    addedLearningObjective: (
      state,
      action: PayloadAction<{ courseDraftId: string }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const newObjectiveEntry = {
        id: crypto.randomUUID(),
        text: '',
      };

      courseDraft.courseContent.learningObjectives.push(newObjectiveEntry);
    },
    updatedPrerequisite: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        prerequisiteId: string;
        text: string;
      }>
    ) => {
      const prerequisite = state
        .find(({ id }) => id === action.payload.courseDraftId)
        ?.courseContent.prerequisites.find(
          ({ id }) => id === action.payload.prerequisiteId
        );

      if (!prerequisite) return;

      prerequisite.text = action.payload.text;
    },
    addedPrerequisite: (
      state,
      action: PayloadAction<{ courseDraftId: string }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const newPrerequisiteEntry = {
        id: crypto.randomUUID(),
        text: '',
      };

      courseDraft.courseContent.prerequisites.push(newPrerequisiteEntry);
    },
    updatedIntendedLearners: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        intendedLearnersId: string;
        text: string;
      }>
    ) => {
      const intendedLearnersElement = state
        .find(({ id }) => id === action.payload.courseDraftId)
        ?.courseContent.intendedLearners.find(
          ({ id }) => id === action.payload.intendedLearnersId
        );

      if (!intendedLearnersElement) return;

      intendedLearnersElement.text = action.payload.text;
    },
    addedIntendedLearners: (
      state,
      action: PayloadAction<{ courseDraftId: string }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const newIntendedLearnersEntry = {
        id: crypto.randomUUID(),
        text: '',
      };

      courseDraft.courseContent.intendedLearners.push(newIntendedLearnersEntry);
    },
  },
});

export const {
  createdCourseDraft,
  updatedLearningObjective,
  addedLearningObjective,
  updatedPrerequisite,
  addedPrerequisite,
  updatedIntendedLearners,
  addedIntendedLearners,
} = slice.actions;
export default slice.reducer;
