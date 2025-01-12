import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CourseType,
  KnownCourseCategory,
  TimeAvailablePerWeek,
} from './courseCreationSlice';
import { getRandomInt } from '../../data/courseData';
import { getLectureDescriptionLocalStorageKey } from '../components/text-editor/utils';
import { ItemWithOrderIndex } from '../components/drag-and-drop-v2/utils';
import { Language, getLanguage } from './languageSlice';

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

interface Rating {
  courseId: string;
  userEmail: string;
  rating: number;
}

interface Enrollment {
  courseId: string;
  userEmail: string;
  enrollmentDate: string;
}

export interface CourseDraft {
  id: number;
  creatorId: number;
  creatorEmail: string;
  courseType: CourseType;
  courseTitle: string;
  courseCategory: KnownCourseCategory;
  creatorTimeAvailablePerWeek: TimeAvailablePerWeek;
  isPublic: boolean;
  isSubmissionProcessCompleted: boolean;
  courseContent: CourseContent;
  ratings: Rating[];
  enrollments: Enrollment[];
  createdAt: string;
  language: Language;
}

export interface TextWithId extends Reorderable {
  id: number;
  text: string;
}

export interface ReorderableTextArrayObject {
  type: UpdateableCourseContentProperty;
  items: TextWithId[];
}

export interface Lesson {
  id: number;
  name: string;
  orderIndex: number;
  description: string;
}

export interface ICurriculumSection {
  id: number;
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
  | 'id'
  | 'isPublic'
  | 'isSubmissionProcessCompleted'
  | 'courseContent'
  | 'ratings'
  | 'enrollments'
  | 'createdAt'
  | 'language'
>;

interface ValidateTextWithIdArrayOptions {
  array: TextWithId[];
  minElementCount: number;
  minTextLength: number;
}

const minLearningObjectivesCount = 4;
const minPrerequisitesCount = 1;
const minIntendedLearnersCount = 1;
export const minTextItemTextLength = 1;

// NOTE: Use only in wrapper functions.
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
      id: k,
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
      id: getRandomInt(1, 10_000_000),
      title: 'Introduction',
      learningObjective: '',
      orderIndex: -1,
      lessons: [
        {
          id: getRandomInt(0, 10_000_000),
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

const initialState: CourseDraft[] = [];

const slice = createSlice({
  name: 'courseDrafts',
  initialState,
  reducers: {
    createdCourseDraft: (state, action: PayloadAction<NewCourseDraftEntry>) => {
      const id = getRandomInt(1, 10_000_000);
      const newCourseDraft: CourseDraft = {
        ...action.payload,
        id,
        isPublic: true,
        isSubmissionProcessCompleted: false,
        courseContent: getInitialCourseContent(),
        ratings: [],
        enrollments: [],
        createdAt: new Date().toISOString(),
        language: getLanguage('english'),
      };
      state.push(newCourseDraft);
    },
    updatedText: (
      state,
      action: PayloadAction<{
        courseDraftId: number;
        itemId: number;
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
        courseDraftId: number;
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
        courseDraftId: number;
        type: UpdateableCourseContentProperty;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      courseDraft.courseContent[action.payload.type].items.push({
        id: getRandomInt(1, 10_000_000),
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
        courseDraftId: number;
        textItemId: number;
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
      action: PayloadAction<{ courseDraftId: number }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const newSection: ICurriculumSection = {
        id: getRandomInt(1, 10_000_000),
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
        courseDraftId: number;
        curriculumSectionId: number;
      }>
    ) => {
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const idToBeDeleted = action.payload.curriculumSectionId;

      const section = courseDraft.courseContent.curriculum.find(
        (p) => p.id === idToBeDeleted
      );

      if (!section) return;

      // NOTE: Currently lecture
      // descriptions use text editor
      // and the state is in local storage.
      section.lessons.forEach((lesson) => {
        const localStorageKey = getLectureDescriptionLocalStorageKey(
          courseDraft.id,
          section.id,
          lesson.id
        );

        localStorage.removeItem(localStorageKey);
      });

      const newCurriculum = courseDraft.courseContent.curriculum.filter(
        ({ id }) => id !== idToBeDeleted
      );

      courseDraft.courseContent.curriculum = newCurriculum;
    },
    updatedCurriculumSectionText: (
      state,
      action: PayloadAction<{
        courseDraftId: number;
        curriculumSectionId: number;
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
    reorderedSections: (
      state,
      action: PayloadAction<{
        courseDraftId: number;
        newOrder: ItemWithOrderIndex[];
      }>
    ) => {
      const newOrder = action.payload.newOrder;
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      courseDraft.courseContent.curriculum.forEach((section) => {
        const newOrderIndex = newOrder.find(
          ({ id }) => id === section.id
        )?.orderIndex;
        if (newOrderIndex === undefined) return;
        section.orderIndex = newOrderIndex;
      });
    },
    addedLecture: (
      state,
      action: PayloadAction<{
        courseDraftId: number;
        curriculumSectionId: number;
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
        id: getRandomInt(0, 10_000_000),
        name: action.payload.lectureTitle,
        orderIndex:
          section.lessons.length > 0
            ? Math.max(...section.lessons.map(({ orderIndex }) => orderIndex)) +
              1
            : -1,
        description: '',
      });
    },
    // NOTE: The lecture description is edited
    // in rich text editor. We might not ever
    // need or want to save the state in redux.
    // The editor state is saved in local storage.
    // Instead we can send the data to server
    // without saving it in redux.
    updatedLecture: (
      state,
      action: PayloadAction<{
        courseDraftId: number;
        curriculumSectionId: number;
        lectureId: number;
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
    updatedVideo: (
      state,
      action: PayloadAction<{
        courseDraftId: number;
        curriculumSectionId: number;
        lectureId: number;
        url: string;
        lengthSeconds: number;
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

      // NOTE: on internet branch video is not
      // anymore in lesson interface
      // videos get presigned url when
      // user wants to view them

      // Release old url if it exists
      // if (lecture.video) {
      //   URL.revokeObjectURL(lecture.video.url);
      // }

      // lecture.video = {
      //   url: action.payload.url,
      //   lengthSeconds: action.payload.lengthSeconds,
      // };
    },
    deletedLecture: (
      state,
      action: PayloadAction<{
        courseDraftId: number;
        curriculumSectionId: number;
        lectureId: number;
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

      // NOTE: Currently lecture
      // descriptions use text editor
      // and the state is in local storage.
      const localStorageKey = getLectureDescriptionLocalStorageKey(
        courseDraft.id,
        section.id,
        action.payload.lectureId
      );

      localStorage.removeItem(localStorageKey);
    },
    reorderedLectures: (
      state,
      action: PayloadAction<{
        courseDraftId: number;
        sectionId: number;
        newOrder: ItemWithOrderIndex[];
      }>
    ) => {
      const newOrder = action.payload.newOrder;
      const courseDraft = state.find(
        ({ id }) => id === action.payload.courseDraftId
      );

      if (!courseDraft) return;

      const section = courseDraft.courseContent.curriculum.find(
        ({ id }) => id === action.payload.sectionId
      );

      if (!section) return;

      section.lessons.forEach((lecture) => {
        const newOrderIndex = newOrder.find(
          ({ id }) => id === lecture.id
        )?.orderIndex;
        if (newOrderIndex === undefined) return;
        lecture.orderIndex = newOrderIndex;
      });
    },
    fetchedCourseDrafts: (_, action: PayloadAction<CourseDraft[]>) => {
      return action.payload;
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
  reorderedSections,
  addedLecture,
  updatedLecture,
  updatedVideo,
  deletedLecture,
  reorderedLectures,
  fetchedCourseDrafts,
} = slice.actions;
export default slice.reducer;
