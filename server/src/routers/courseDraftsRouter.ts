import { Router } from 'express';
import { userExtractor } from '../middleware';
import { errorName } from '../errorNames';
import { createCourseDraft } from '../queries/courseDraftQueries';

const timeAvailablePerWeek = {
  imVeryBusy: '0-2 hours',
  iWorkOnThisOnTheSide: '2-4 hours',
  iHaveLotsOfFlexibility: '5+ hours',
  iHaventDecidedIfIHaveTime: 'indecisive',
} as const;

const courseCategories = {
  design: 'Design',
  development: 'Development',
  marketing: 'Marketing',
  itAndSoftware: 'IT and Software',
  personalDevelopment: 'Personal Development',
  business: 'Business',
  photography: 'Photography',
  music: 'Music',
} as const;

const languageCodes = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  italian: 'it',
  portuguese: 'pt',
  finnish: 'fi',
  dutch: 'nl',
  chinese: 'zh',
  japanese: 'ja',
  korean: 'ko',
  arabic: 'ar',
} as const;

const languages = {
  english: {
    name: 'English',
    code: languageCodes.english,
  },
  spanish: {
    name: 'Spanish',
    code: languageCodes.spanish,
  },
  french: {
    name: 'French',
    code: languageCodes.french,
  },
  german: {
    name: 'German',
    code: languageCodes.german,
  },
  italian: {
    name: 'Italian',
    code: languageCodes.italian,
  },
  portuguese: {
    name: 'Portuguese',
    code: languageCodes.portuguese,
  },
  finnish: {
    name: 'Finnish',
    code: languageCodes.finnish,
  },
  dutch: {
    name: 'Dutch',
    code: languageCodes.dutch,
  },
  chinese: {
    name: 'Chinese',
    code: languageCodes.chinese,
  },
  japanese: {
    name: 'Japanese',
    code: languageCodes.japanese,
  },
  korean: {
    name: 'Korean',
    code: languageCodes.korean,
  },
  arabic: {
    name: 'Arabic',
    code: languageCodes.arabic,
  },
} as const;

export type CourseType = 'course' | 'practice-test';
type Language = (typeof languages)[keyof typeof languages];
export type KnownCourseCategory =
  (typeof courseCategories)[keyof typeof courseCategories];
export type TimeAvailablePerWeek =
  (typeof timeAvailablePerWeek)[keyof typeof timeAvailablePerWeek];

// NOTE: These types must
// match the actual property names which
// can be updated in course content.
// The reducers select the correct properties
// to be updated using these types.
type UpdateableCourseContentProperty =
  | 'learningObjectives'
  | 'prerequisites'
  | 'intendedLearners';

interface Reorderable {
  orderIndex: number;
}

interface TextWithId extends Reorderable {
  id: string;
  text: string;
}

interface ReorderableTextArrayObject {
  type: UpdateableCourseContentProperty;
  items: TextWithId[];
}

interface Lesson {
  id: string;
  name: string;
  orderIndex: number;
  description: string;
  video?: {
    url: string;
    lengthSeconds: number;
  };
}

interface ICurriculumSection {
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
  // NOTE: Language is not currently typed
  language: string;
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

interface CreateCourseDraftRequestBody {
  newCourseDraftEntry: NewCourseDraftEntry;
}

const isKnownCourseCategory = (
  category: string
): category is KnownCourseCategory => {
  return Object.values(courseCategories).includes(
    category as KnownCourseCategory
  );
};

const isKnownCourseType = (courseType: string): courseType is CourseType => {
  return courseType === 'course' || courseType === 'practice-test';
};

const isEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(email) && email.length <= 255;
  return isValid;
};

const isTimeAvailablePerWeek = (
  timeAvailable: string
): timeAvailable is TimeAvailablePerWeek => {
  return Object.values(timeAvailablePerWeek).includes(
    timeAvailable as TimeAvailablePerWeek
  );
};

const toCreateCourseDraftRequestBody = (
  body: unknown
): CreateCourseDraftRequestBody => {
  try {
    if (!body || typeof body !== 'object') {
      const error = new Error('Request body is not an object.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (
      !('newCourseDraftEntry' in body) ||
      typeof body.newCourseDraftEntry !== 'object'
    ) {
      const error = new Error('Request body is missing newCourseDraftEntry.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    const newCourseDraftEntry = body.newCourseDraftEntry;

    if (!newCourseDraftEntry || typeof newCourseDraftEntry !== 'object') {
      const error = new Error('newCourseDraftEntry is not an object.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (
      !('creatorEmail' in newCourseDraftEntry) ||
      typeof newCourseDraftEntry.creatorEmail !== 'string' ||
      !isEmail(newCourseDraftEntry.creatorEmail)
    ) {
      const error = new Error('creatorEmail is not a valid email.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (
      !('courseType' in newCourseDraftEntry) ||
      typeof newCourseDraftEntry.courseType !== 'string' ||
      !isKnownCourseType(newCourseDraftEntry.courseType)
    ) {
      const error = new Error('courseType is not a valid course type.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (
      !('courseTitle' in newCourseDraftEntry) ||
      typeof newCourseDraftEntry.courseTitle !== 'string' ||
      newCourseDraftEntry.courseTitle.length > 60
    ) {
      const error = new Error('courseTitle is not a string.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (
      !('courseCategory' in newCourseDraftEntry) ||
      typeof newCourseDraftEntry.courseCategory !== 'string' ||
      !isKnownCourseCategory(newCourseDraftEntry.courseCategory)
    ) {
      const error = new Error('courseCategory is not a valid course category.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (
      !('creatorTimeAvailablePerWeek' in newCourseDraftEntry) ||
      typeof newCourseDraftEntry.creatorTimeAvailablePerWeek !== 'string' ||
      !isTimeAvailablePerWeek(newCourseDraftEntry.creatorTimeAvailablePerWeek)
    ) {
      const error = new Error(
        'creatorTimeAvailablePerWeek is not a valid time available per week.'
      );
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    const validNewCourseDraftEntry: NewCourseDraftEntry = {
      creatorEmail: newCourseDraftEntry.creatorEmail,
      courseCategory: newCourseDraftEntry.courseCategory,
      courseTitle: newCourseDraftEntry.courseTitle,
      courseType: newCourseDraftEntry.courseType,
      creatorTimeAvailablePerWeek:
        newCourseDraftEntry.creatorTimeAvailablePerWeek,
    };

    return { newCourseDraftEntry: validNewCourseDraftEntry };
  } catch (error) {
    if (!(error instanceof Error)) {
      const unknownError = new Error(
        'Unknown error occurred at toCreateCourseDraftRequestBody.'
      );
      unknownError.name = errorName.unknownError;
      throw unknownError;
    }

    throw error;
  }
};

const router = Router();

router.post('/', userExtractor, async (req, res, next) => {
  try {
    const createCourseDraftRequestBody = toCreateCourseDraftRequestBody(
      req.body
    );

    const databaseResult = await createCourseDraft(
      createCourseDraftRequestBody.newCourseDraftEntry
    );

    return res.status(201).json(databaseResult);
  } catch (error) {
    next(error);
  }
});

export default router;
