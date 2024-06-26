import { Router } from 'express';
import { userExtractor } from '../middleware';
import { errorName } from '../errorNames';
import {
  createCourseDraft,
  createCurriculumSection,
  createIntendedLearner,
  createLearningObjective,
  createLesson,
  createPrerequisite,
  deleteIntendedLearner,
  deleteLearningObjective,
  deletePrerequisite,
  getCourseDraft,
  getCourseDrafts,
  updateCourseDraftCourseGoals,
  updateCurriculumSections,
} from '../queries/courseDraftQueries';

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

export interface TextWithId extends Reorderable {
  id: number;
  text: string;
}

export interface ReorderableTextArrayObject {
  type: UpdateableCourseContentProperty;
  items: TextWithId[];
}

const isUpdateableCourseContentProperty = (
  key: unknown
): key is UpdateableCourseContentProperty => {
  return (
    key === 'learningObjectives' ||
    key === 'prerequisites' ||
    key === 'intendedLearners'
  );
};

// NOTE: Some id's are still strings
// but all ids should be numbers
const isTextWithId = (obj: unknown): obj is TextWithId => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (!('id' in obj) || typeof obj.id !== 'string') {
    return false;
  }

  if (!('text' in obj) || typeof obj.text !== 'string') {
    return false;
  }

  if (!('orderIndex' in obj) || typeof obj.orderIndex !== 'number') {
    return false;
  }

  return true;
};

const isReorderableTextArrayObject = (
  obj: unknown
): obj is ReorderableTextArrayObject => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (!('type' in obj) || !isUpdateableCourseContentProperty(obj.type)) {
    return false;
  }

  if (!('items' in obj) || !Array.isArray(obj.items)) {
    return false;
  }

  if (obj.items.length > 0) {
    obj.items.forEach((item) => {
      if (!isTextWithId(item)) {
        return false;
      }
    });
  }

  return true;
};

export interface Lesson {
  id: number;
  name: string;
  orderIndex: number;
  description: string;
  video?: {
    url: string;
    lengthSeconds: number;
  };
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

export interface CreateLearningObjectiveRequestBody {
  learningObjective: string;
  orderIndex: number;
}

export interface CreatePrerequisiteRequestBody {
  prerequisite: string;
  orderIndex: number;
}

export interface CreateIntendedLearnerRequestBody {
  intendedLearner: string;
  orderIndex: number;
}

export interface UpdateCourseGoalsRequestBody {
  learningObjectives: ReorderableTextArrayObject;
  prerequisites: ReorderableTextArrayObject;
  intendedLearners: ReorderableTextArrayObject;
}

type ICurriculumSectionUpdateEntry = ICurriculumSection;

export interface UpdateCurriculumSectionsRequestBody {
  entries: ICurriculumSectionUpdateEntry[];
}

interface CreateLectureRequestBody {
  title: string;
}

const toCreateLearningObjectiveRequestBody = (
  body: unknown
): CreateLearningObjectiveRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Request body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !('learningObjective' in body) ||
    typeof body.learningObjective !== 'string'
  ) {
    const error = new Error(
      'learningObjective is missing or its not a string.'
    );
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('orderIndex' in body) || typeof body.orderIndex !== 'number') {
    const error = new Error('orderIndex is missing or its not a number.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  return {
    learningObjective: body.learningObjective,
    orderIndex: body.orderIndex,
  };
};

const toCreatePrerequisiteRequestBody = (
  body: unknown
): CreatePrerequisiteRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Request body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('prerequisite' in body) || typeof body.prerequisite !== 'string') {
    const error = new Error(
      'learningObjective is missing or its not a string.'
    );
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('orderIndex' in body) || typeof body.orderIndex !== 'number') {
    const error = new Error('orderIndex is missing or its not a number.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  return {
    prerequisite: body.prerequisite,
    orderIndex: body.orderIndex,
  };
};

const toCreateIntendedLearnerRequestBody = (
  body: unknown
): CreateIntendedLearnerRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Request body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !('intendedLearner' in body) ||
    typeof body.intendedLearner !== 'string'
  ) {
    const error = new Error('intendedLearner is missing or its not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('orderIndex' in body) || typeof body.orderIndex !== 'number') {
    const error = new Error('orderIndex is missing or its not a number.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  return {
    intendedLearner: body.intendedLearner,
    orderIndex: body.orderIndex,
  };
};

const toUpdateCourseGoalsRequestBody = (
  courseDraftId: number,
  body: unknown
): UpdateCourseGoalsRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Request body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (isNaN(courseDraftId)) {
    const error = new Error('courseDraftId is not a number.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !('learningObjectives' in body) ||
    !isReorderableTextArrayObject(body.learningObjectives)
  ) {
    const error = new Error(
      'learningObjectives is missing or its not a reorderable text array object.'
    );
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !('prerequisites' in body) ||
    !isReorderableTextArrayObject(body.prerequisites)
  ) {
    const error = new Error(
      'prerequisites is missing or its not a reorderable text array object.'
    );
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !('intendedLearners' in body) ||
    !isReorderableTextArrayObject(body.intendedLearners)
  ) {
    const error = new Error(
      'intendedLearners is missing or its not a reorderable text array object.'
    );
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  return {
    learningObjectives: body.learningObjectives,
    prerequisites: body.prerequisites,
    intendedLearners: body.intendedLearners,
  };
};

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
      !('creatorId' in newCourseDraftEntry) ||
      typeof newCourseDraftEntry.creatorId !== 'number'
    ) {
      const error = new Error('creatorId is missing or its not a number.');
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
      creatorId: newCourseDraftEntry.creatorId,
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

const toUpdateCurriculumSectionsRequestBody = (
  body: unknown
): UpdateCurriculumSectionsRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Request body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('entries' in body)) {
    const error = new Error('Body is missing entries property.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const entries = body.entries;

  if (!Array.isArray(entries)) {
    const error = new Error('Entries is not an array.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const validEntries: ICurriculumSectionUpdateEntry[] = entries.map((entry) => {
    if (!entry || typeof entry !== 'object') {
      const error = new Error('Entry is missing or its not an object.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (!('id' in entry) || typeof entry.id !== 'number') {
      const error = new Error('Id is missing from entry or its not a number.');
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (!('title' in entry) || typeof entry.title !== 'string') {
      const error = new Error(
        'Title is missing from entry or its not a number.'
      );
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (
      !('learningObjective' in entry) ||
      typeof entry.learningObjective !== 'string'
    ) {
      const error = new Error(
        'Learning objective is missing from entry or its not a string.'
      );
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (!('orderIndex' in entry) || typeof entry.orderIndex !== 'number') {
      const error = new Error(
        'Order index is missing from entry or its not a number.'
      );
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    if (!('lessons' in entry) || !Array.isArray(entry.lessons)) {
      const error = new Error(
        'Lessons is missing from entry or its not an array.'
      );
      error.name = errorName.clientSentInvalidData;
      throw error;
    }

    const entryLessons: unknown[] = entry.lessons;

    const validLessons = entryLessons.map((lesson) => {
      if (!lesson || typeof lesson !== 'object') {
        const error = new Error('Lesson is missing or its not an object.');
        error.name = errorName.clientSentInvalidData;
        throw error;
      }

      if (!('id' in lesson) || typeof lesson.id !== 'number') {
        const error = new Error(
          'Id is missing from lesson or its not a number.'
        );
        error.name = errorName.clientSentInvalidData;
        throw error;
      }

      if (!('name' in lesson) || typeof lesson.name !== 'string') {
        const error = new Error(
          'Name is missing from lesson or its not a string.'
        );
        error.name = errorName.clientSentInvalidData;
        throw error;
      }

      if (!('orderIndex' in lesson) || typeof lesson.orderIndex !== 'number') {
        const error = new Error(
          'Order index is missing from lesson or its not a number.'
        );
        error.name = errorName.clientSentInvalidData;
        throw error;
      }

      if (
        !('description' in lesson) ||
        typeof lesson.description !== 'string'
      ) {
        const error = new Error(
          'Description is missing from lesson or its not a string.'
        );
        error.name = errorName.clientSentInvalidData;
        throw error;
      }

      const validLesson: Omit<Lesson, 'video'> = {
        id: lesson.id,
        name: lesson.name,
        orderIndex: lesson.orderIndex,
        description: lesson.description,
      };

      return validLesson;
    });

    const validEntry: ICurriculumSectionUpdateEntry = {
      id: entry.id,
      title: entry.title,
      learningObjective: entry.learningObjective,
      orderIndex: entry.orderIndex,
      lessons: validLessons,
    };

    return validEntry;
  });

  const validRequest: UpdateCurriculumSectionsRequestBody = {
    entries: validEntries,
  };

  return validRequest;
};

const toCreateLectureRequestBody = (
  body: unknown
): CreateLectureRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Request body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('title' in body) || typeof body.title !== 'string') {
    const error = new Error('Lecture title is missing or its not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  return { title: body.title };
};

const router = Router();

router.get('/', userExtractor, async (req, res, next) => {
  try {
    // NOTE: This should not happen after user
    // extractor middleware but its added for
    // typescript.
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'User was not found. Please sign in.' });
    }

    const courseDraftFromDatabaseResult = await getCourseDrafts(req.user.id);

    return res.status(200).json(courseDraftFromDatabaseResult);
  } catch (error) {
    next(error);
  }
});

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

router.post(
  '/:coursedraftid/sections',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);
      await createCurriculumSection({ courseDraftId, userId: req.user.id });
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:coursedraftid/sections/:sectionid/lessons',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const sectionId = parseInt(req.params.sectionid);
      const requestBody = toCreateLectureRequestBody(req.body);

      await createLesson({
        curriculumSectionId: sectionId,
        userId: req.user.id,
        title: requestBody.title,
      });
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:coursedraftid/goals/learningobjectives',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const createLearningObjectiveRequestBody =
        toCreateLearningObjectiveRequestBody(req.body);

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const courseDraftInDatabase = await getCourseDraft({
        userId: req.user.id,
        courseDraftId,
      });

      const isCourseDraftInDatabase = courseDraftInDatabase !== null;

      if (!isCourseDraftInDatabase) {
        return res.status(404).json({ message: 'Course draft was not found.' });
      }

      const createdLearningObjective = await createLearningObjective({
        userId: req.user.id,
        courseDraftId,
        text: createLearningObjectiveRequestBody.learningObjective,
        orderIndex: createLearningObjectiveRequestBody.orderIndex,
      });

      return res.status(201).json(createdLearningObjective);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:coursedraftid/goals/prerequisites',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const createPrerequisiteRequestBody = toCreatePrerequisiteRequestBody(
        req.body
      );

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const courseDraftInDatabase = await getCourseDraft({
        userId: req.user.id,
        courseDraftId,
      });

      const isCourseDraftInDatabase = courseDraftInDatabase !== null;

      if (!isCourseDraftInDatabase) {
        return res.status(404).json({ message: 'Course draft was not found.' });
      }

      const createdPrerequisite = await createPrerequisite({
        userId: req.user.id,
        courseDraftId,
        text: createPrerequisiteRequestBody.prerequisite,
        orderIndex: createPrerequisiteRequestBody.orderIndex,
      });

      return res.status(201).json(createdPrerequisite);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:coursedraftid/goals/intendedlearners',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const createIntendedLearnerRequestBody =
        toCreateIntendedLearnerRequestBody(req.body);

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const courseDraftInDatabase = await getCourseDraft({
        userId: req.user.id,
        courseDraftId,
      });

      const isCourseDraftInDatabase = courseDraftInDatabase !== null;

      if (!isCourseDraftInDatabase) {
        return res.status(404).json({ message: 'Course draft was not found.' });
      }

      const createdIntendedLearner = await createIntendedLearner({
        userId: req.user.id,
        courseDraftId,
        text: createIntendedLearnerRequestBody.intendedLearner,
        orderIndex: createIntendedLearnerRequestBody.orderIndex,
      });

      return res.status(201).json(createdIntendedLearner);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:coursedraftid/goals', userExtractor, async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'User was not found. Please sign in.' });
    }

    const courseDraftId = parseInt(req.params.coursedraftid);
    const updateCourseGoalsRequestBody = toUpdateCourseGoalsRequestBody(
      courseDraftId,
      req.body
    );

    await updateCourseDraftCourseGoals({
      courseDraftId,
      userId: req.user.id,
      updateRequest: updateCourseGoalsRequestBody,
    });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:coursedraftid/curriculum/sections/',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);
      const updateCurriculumSectionsOrderIndiciesRequestBody =
        toUpdateCurriculumSectionsRequestBody(req.body);

      await updateCurriculumSections({
        userId: req.user.id,
        courseDraftId,
        requestBody: updateCurriculumSectionsOrderIndiciesRequestBody,
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

// NOTE: Course draft id is not needed here
// but it is added for consistent routing.
router.delete(
  '/:coursedraftid/goals/learningobjectives/:learningobjectiveid',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const learningObjectiveId = parseInt(req.params.learningobjectiveid);

      if (isNaN(learningObjectiveId)) {
        return res
          .status(400)
          .json({ message: 'Invalid learning objective id.' });
      }

      await deleteLearningObjective({
        userId: req.user.id,
        learningObjectiveId,
      });
      return res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:coursedraftid/goals/prerequisites/:prerequisiteid',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const prerequisiteId = parseInt(req.params.prerequisiteid);

      if (isNaN(prerequisiteId)) {
        return res.status(400).json({ message: 'Invalid prerequisite id.' });
      }

      await deletePrerequisite({
        userId: req.user.id,
        prerequisiteId,
      });
      return res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:coursedraftid/goals/intendedlearners/:intendedlearnerid',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const intendedLearnerId = parseInt(req.params.intendedlearnerid);

      if (isNaN(intendedLearnerId)) {
        return res
          .status(400)
          .json({ message: 'Invalid intended learner id.' });
      }

      await deleteIntendedLearner({
        userId: req.user.id,
        intendedLearnerId,
      });
      return res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
