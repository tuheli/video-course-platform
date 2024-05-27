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

interface CourseContent {
  // NOTE: Remember to update getCourseDraftProgressValue when adding more properties
  learningObjectives: string[];
  prerequisites: string[];
  intendedLearners: string[];
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
        'Student understands fbx file format and its use in game development',
        'Student understands why rigs are used, what they are and what they do',
        'Student understands real-time animation functionalities in Unity and Unreal Engine',
        'Student is able to utilize real-time animation in Unity and Unreal Engine',
        'Student understands 3D spaces and can effectively utilize them in rig creation, modification and real-time animation',
        'Student understands the importance of non-destructive workflows in 3D animation',
        'Student is able to use and customize constraints applied to animation rigs',
        'Student is able to create a modular rig for any given 3D model',
        'Student understands export and import process of fbx files for Unity and Unreal Engine',
      ],
      prerequisites: [],
      intendedLearners: [
        'Game developers',
        '3D artists',
        'Animators',
        'Programmers',
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
      learningObjectives: [],
      prerequisites: [],
      intendedLearners: ['Small business owners', 'Entrepreneurs'],
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
      learningObjectives: [],
      prerequisites: [],
      intendedLearners: [],
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
      learningObjectives: [],
      prerequisites: [],
      intendedLearners: ['Small business owners', 'Entrepreneurs'],
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
          intendedLearners: [],
          learningObjectives: [],
          prerequisites: [],
          videoContentLengthSeconds: 0,
        },
      };
      state.push(newCourseDraft);
    },
  },
});

export const { createdCourseDraft } = slice.actions;
export default slice.reducer;
