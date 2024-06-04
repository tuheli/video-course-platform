import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CourseType,
  KnownCourseCategory,
  TimeAvailablePerWeek,
} from './courseCreationSlice';
import { getRandomInt } from '../../data/courseData';

// NOTE: These types must
// match the actual property names which
// can be updated in course content.
// The reducers select the correct properties
// to be updated using these types.
export type UpdateableCourseContentProperty =
  | 'learningObjectives'
  | 'prerequisites'
  | 'intendedLearners';

export type UpdateableCurriculumSectionProperty = 'title' | 'learningObjective';

interface Reorderable {
  orderIndex: number;
}

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

export interface TextWithId extends Reorderable {
  id: string;
  text: string;
}

interface ReorderableTextArrayObject {
  type: UpdateableCourseContentProperty;
  items: TextWithId[];
}

export interface Lesson {
  id: string;
  name: string;
  orderIndex: number;
  description: string;
}

export interface ICurriculumSection {
  id: string;
  title: string;
  learningObjective: string;
  orderIndex: number;
  lessons: Lesson[];
}

interface CourseContent {
  // NOTE: Remember to update getCourseDraftProgressValue when adding more properties
  learningObjectives: ReorderableTextArrayObject;
  prerequisites: ReorderableTextArrayObject;
  intendedLearners: ReorderableTextArrayObject;
  // NOTE: Video content length is not currently checked
  videoContentLengthSeconds: number;
  curriculum: ICurriculumSection[];
}

export type NewCourseDraftEntry = Omit<
  CourseDraft,
  'id' | 'isPublic' | 'isSubmissionProcessCompleted' | 'courseContent'
>;

interface ValidateTextWithIdArrayOptions {
  array: TextWithId[];
  minElementCount: number;
  minTextLength: number;
}

const minLearningObjectivesCount = 4;
const minPrerequisitesCount = 1;
const minIntendedLearnersCount = 1;

// NOTE: Used in wrapper functions to be more descriptive
const validateTextWithIdArray = ({
  array,
  minElementCount,
  minTextLength,
}: ValidateTextWithIdArrayOptions) => {
  const hasEnoughElements = array.length >= minElementCount;

  if (!hasEnoughElements) {
    return false;
  }

  const areElementTextLengthsOk = array.every(
    (p) => p.text.length >= minTextLength
  );

  if (!areElementTextLengthsOk) {
    return false;
  }

  return true;
};

const isLearningObjectivesReadyForSubmission = (
  learningObjectives: TextWithId[]
) => {
  return validateTextWithIdArray({
    array: learningObjectives,
    minElementCount: minLearningObjectivesCount,
    minTextLength: 1,
  });
};

const isPrerequisitesReadyForSubmission = (prerequisites: TextWithId[]) => {
  return validateTextWithIdArray({
    array: prerequisites,
    minElementCount: minPrerequisitesCount,
    minTextLength: 1,
  });
};

const isIntendedLearnersReadyForSubmission = (
  intendedLearners: TextWithId[]
) => {
  return validateTextWithIdArray({
    array: intendedLearners,
    minElementCount: minIntendedLearnersCount,
    minTextLength: 1,
  });
};

export const isIntendedLearnersSectionReadyForSubmission = (
  learningObjectives: TextWithId[],
  prerequisites: TextWithId[],
  intendedLearners: TextWithId[]
) => {
  return (
    isLearningObjectivesReadyForSubmission(learningObjectives) &&
    isPrerequisitesReadyForSubmission(prerequisites) &&
    isIntendedLearnersReadyForSubmission(intendedLearners)
  );
};

export const getCourseDraftProgressValue = (courseDraft: CourseDraft) => {
  const { learningObjectives, prerequisites, intendedLearners } =
    courseDraft.courseContent;

  const minProgressValue = 2; // Lets always show some progress for the slider to be visible
  const objectivesCount = 3;
  let completedObjectives = 0;

  completedObjectives += isLearningObjectivesReadyForSubmission(
    learningObjectives.items
  )
    ? 1
    : 0;

  completedObjectives += isPrerequisitesReadyForSubmission(prerequisites.items)
    ? 1
    : 0;

  completedObjectives += isIntendedLearnersReadyForSubmission(
    intendedLearners.items
  )
    ? 1
    : 0;

  if (completedObjectives === 0) return minProgressValue;

  const progressValue = (completedObjectives / objectivesCount) * 100;

  if (progressValue > 100) return 100;
  if (progressValue < 0) return minProgressValue;
  return progressValue;
};

const getTextWithIdArray = (length: number): TextWithId[] => {
  return Array.from({ length }, (_, k) => {
    return {
      id: `${k}`,
      text: '',
      orderIndex: -1,
    };
  });
};

const getReorderableTextArrayObject = (
  itemCount: number,
  type: UpdateableCourseContentProperty
): ReorderableTextArrayObject => {
  return {
    type,
    items: getTextWithIdArray(itemCount),
  };
};

const getInitialCurriculum = () => {
  const sections: ICurriculumSection[] = [
    {
      id: crypto.randomUUID(),
      title: 'Introduction',
      learningObjective: '',
      orderIndex: -1,
      lessons: [
        {
          id: crypto.randomUUID(),
          name: 'Course Introduction',
          orderIndex: -1,
          description: '',
        },
      ],
    },
  ];

  return sections;
};

const getInitialCourseContent = () => {
  const courseContent: CourseContent = {
    intendedLearners: getReorderableTextArrayObject(
      minIntendedLearnersCount,
      'intendedLearners'
    ),
    learningObjectives: getReorderableTextArrayObject(
      minLearningObjectivesCount,
      'learningObjectives'
    ),
    prerequisites: getReorderableTextArrayObject(
      minPrerequisitesCount,
      'prerequisites'
    ),
    videoContentLengthSeconds: getRandomInt(0, 1000),
    curriculum: getInitialCurriculum(),
  };

  return courseContent;
};

export const isAbleToDeleteLearningObjective = (courseDraft: CourseDraft) => {
  return (
    courseDraft.courseContent.learningObjectives.items.length >
    minLearningObjectivesCount
  );
};

export const isAbleToDeletePrerequisite = (courseDraft: CourseDraft) => {
  return (
    courseDraft.courseContent.prerequisites.items.length > minPrerequisitesCount
  );
};

export const isAbleToDeleteIntendedLearners = (courseDraft: CourseDraft) => {
  return (
    courseDraft.courseContent.intendedLearners.items.length >
    minIntendedLearnersCount
  );
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
      learningObjectives: {
        type: 'learningObjectives',
        items: [
          {
            id: '1',
            text: 'Student understands fbx file format and its use in game development',
            orderIndex: 999, // Should be last
          },
          {
            id: '2',
            text: 'Student understands why rigs are used, what they are and what they do',
            orderIndex: -1,
          },
          {
            id: '3',
            text: 'Student understands real-time animation functionalities in Unity and Unreal Engine',
            orderIndex: -1,
          },
          {
            id: '4',
            text: 'Student is able to utilize real-time animation in Unity and Unreal Engine',
            orderIndex: -1,
          },
          {
            id: '5',
            text: 'Student understands 3D spaces and can effectively utilize them in rig creation, modification and real-time animation',
            orderIndex: -1,
          },
          {
            id: '6',
            text: 'Student understands the importance of non-destructive workflows in 3D animation',
            orderIndex: -1,
          },

          {
            id: '7',
            text: 'Student is able to use and customize constraints applied to animation rigs',
            orderIndex: -1,
          },
          {
            id: '8',
            text: 'Student is able to create a modular rig for any given 3D model',
            orderIndex: -1,
          },
          {
            id: '9',
            text: 'Student understands export and import process of fbx files for Unity and Unreal Engine',
            orderIndex: -1234, // Should be first
          },
        ],
      },
      prerequisites: {
        type: 'prerequisites',
        items: getTextWithIdArray(minPrerequisitesCount),
      },
      intendedLearners: {
        type: 'intendedLearners',
        items: [
          {
            id: '1',
            text: 'Game developers',
            orderIndex: -1,
          },
          {
            id: '2',
            text: '3D artists',
            orderIndex: -1,
          },
          {
            id: '3',
            text: 'Animators',
            orderIndex: -1,
          },
          {
            id: '4',
            text: 'Programmers',
            orderIndex: -1,
          },
        ],
      },
      videoContentLengthSeconds: 158,
      curriculum: getInitialCurriculum(),
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
      learningObjectives: {
        type: 'learningObjectives',
        items: getTextWithIdArray(minLearningObjectivesCount),
      },
      prerequisites: {
        type: 'prerequisites',
        items: getTextWithIdArray(minPrerequisitesCount),
      },
      intendedLearners: {
        type: 'intendedLearners',
        items: [
          {
            id: '1',
            text: 'Small business owners',
            orderIndex: -1,
          },
          {
            id: '2',
            text: 'Entrepreneurs',
            orderIndex: -1,
          },
        ],
      },
      videoContentLengthSeconds: 0,
      curriculum: getInitialCurriculum(),
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
    courseContent: getInitialCourseContent(),
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
    courseContent: getInitialCourseContent(),
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
        courseContent: getInitialCourseContent(),
      };
      state.push(newCourseDraft);
    },
    updatedText: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        itemId: string;
        newTextValue: string;
        type: UpdateableCourseContentProperty;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const { items } = courseDraft.courseContent[action.payload.type];

      const textObject = items.find(({ id }) => id === action.payload.itemId);

      if (!textObject) return;

      textObject.text = action.payload.newTextValue;
    },
    reorderedItems: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        type: UpdateableCourseContentProperty;
        newState: TextWithId[];
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      courseDraft.courseContent[action.payload.type].items =
        action.payload.newState;
    },
    addedTextItem: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        type: UpdateableCourseContentProperty;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      courseDraft.courseContent[action.payload.type].items.push({
        id: crypto.randomUUID(),
        text: '',
        orderIndex:
          Math.max(
            ...courseDraft.courseContent[action.payload.type].items.map(
              ({ orderIndex }) => orderIndex
            )
          ) + 1,
      });
    },
    deletedTextItem: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        textItemId: string;
        type: UpdateableCourseContentProperty;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const idToBeDeleted = action.payload.textItemId;

      const newLearningObjectives = courseDraft.courseContent[
        action.payload.type
      ].items.filter(({ id }) => id !== idToBeDeleted);

      courseDraft.courseContent[action.payload.type].items =
        newLearningObjectives;
    },
    addedCurriculumSection: (
      state,
      action: PayloadAction<{ courseDraftId: string }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const newSection: ICurriculumSection = {
        id: crypto.randomUUID(),
        title: 'New Section',
        learningObjective: '',
        orderIndex:
          Math.max(
            ...courseDraft.courseContent.curriculum.map(
              ({ orderIndex }) => orderIndex
            )
          ) + 1,
        lessons: [],
      };

      courseDraft.courseContent.curriculum.push(newSection);
    },
    deletedCurriculumSection: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        curriculumSectionId: string;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const idToBeDeleted = action.payload.curriculumSectionId;

      const newCurriculum = courseDraft.courseContent.curriculum.filter(
        ({ id }) => id !== idToBeDeleted
      );

      courseDraft.courseContent.curriculum = newCurriculum;
    },
    updatedCurriculumSectionText: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        curriculumSectionId: string;
        newValue: string;
        type: UpdateableCurriculumSectionProperty;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const section = courseDraft.courseContent.curriculum.find(
        ({ id }) => id === action.payload.curriculumSectionId
      );

      if (!section) return;

      section[action.payload.type] = action.payload.newValue;
    },
    addedLecture: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        curriculumSectionId: string;
        lectureTitle: string;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const section = courseDraft.courseContent.curriculum.find(
        ({ id }) => id === action.payload.curriculumSectionId
      );

      if (!section) return;

      section.lessons.push({
        id: crypto.randomUUID(),
        name: action.payload.lectureTitle,
        orderIndex:
          section.lessons.length > 0
            ? Math.max(...section.lessons.map(({ orderIndex }) => orderIndex)) +
              1
            : -1,
        description: '',
      });
    },
    updatedLecture: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        curriculumSectionId: string;
        lectureId: string;
        propertyName: 'name' | 'description';
        newValue: string;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const section = courseDraft.courseContent.curriculum.find(
        ({ id }) => id === action.payload.curriculumSectionId
      );

      if (!section) return;

      const lecture = section.lessons.find(
        ({ id }) => id === action.payload.lectureId
      );

      if (!lecture) return;

      lecture[action.payload.propertyName] = action.payload.newValue;
    },
    deletedLecture: (
      state,
      action: PayloadAction<{
        courseDraftId: string;
        curriculumSectionId: string;
        lectureId: string;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const section = courseDraft.courseContent.curriculum.find(
        ({ id }) => id === action.payload.curriculumSectionId
      );

      if (!section) return;

      const newLectures = section.lessons.filter(
        ({ id }) => id !== action.payload.lectureId
      );

      section.lessons = newLectures;
    },
  },
});

export const {
  createdCourseDraft,
  reorderedItems,
  updatedText,
  addedTextItem,
  deletedTextItem,
  addedCurriculumSection,
  deletedCurriculumSection,
  updatedCurriculumSectionText,
  addedLecture,
  updatedLecture,
  deletedLecture,
} = slice.actions;
export default slice.reducer;
