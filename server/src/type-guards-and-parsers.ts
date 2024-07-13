import { errorName } from './errorNames';
import {
  UpdateableCourseContentProperty,
  TextWithId,
  ReorderableTextArrayObject,
  CreateLearningObjectiveRequestBody,
  CreatePrerequisiteRequestBody,
  CreateIntendedLearnerRequestBody,
  UpdateCourseGoalsRequestBody,
  KnownCourseCategory,
  courseCategories,
  CourseType,
  TimeAvailablePerWeek,
  timeAvailablePerWeek,
  CreateCourseDraftRequestBody,
  NewCourseDraftEntry,
  UpdateCurriculumSectionsRequestBody,
  ICurriculumSectionUpdateEntry,
  Lesson,
  CreateLectureRequestBody,
  SignInRequestBody,
  SignupRequestBody,
} from './types';

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
// but all ids should be numbers. Correct
// id types are especially important for
// reordering draggable items in frontend.
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

export const toCreateLearningObjectiveRequestBody = (
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

export const toCreatePrerequisiteRequestBody = (
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

export const toCreateIntendedLearnerRequestBody = (
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

export const toUpdateCourseGoalsRequestBody = (
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

export const toCreateCourseDraftRequestBody = (
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

export const toUpdateCurriculumSectionsRequestBody = (
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

export const toCreateLectureRequestBody = (
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

export const toSignInRequestBody = (body: unknown): SignInRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('credentialsNotSafe' in body)) {
    const error = new Error('CredentialsNotSafe is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const credentialsNotSafe = body.credentialsNotSafe;

  if (!credentialsNotSafe || typeof credentialsNotSafe !== 'object') {
    const error = new Error('CredentialsNotSafe is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('email' in credentialsNotSafe)) {
    const error = new Error('Email is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !credentialsNotSafe.email ||
    typeof credentialsNotSafe.email !== 'string'
  ) {
    const error = new Error('Email is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('password' in credentialsNotSafe)) {
    const error = new Error('Password is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (
    !credentialsNotSafe.password ||
    typeof credentialsNotSafe.password !== 'string'
  ) {
    const error = new Error('Property password is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const validSignInRequestBody: SignInRequestBody = {
    credentialsNotSafe: {
      email: credentialsNotSafe.email,
      password: credentialsNotSafe.password,
    },
  };

  return validSignInRequestBody;
};

export const toSignupRequestBody = (body: unknown): SignupRequestBody => {
  if (!body || typeof body !== 'object') {
    const error = new Error('Body is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('credentialsNotSafe' in body)) {
    const error = new Error('Credentials are missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const credentials = body.credentialsNotSafe;

  if (!credentials || typeof credentials !== 'object') {
    const error = new Error('Credentials is not an object.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('email' in credentials)) {
    const error = new Error('Email is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (typeof credentials.email !== 'string') {
    const error = new Error('Email is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('password' in credentials)) {
    const error = new Error('Password is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (typeof credentials.password !== 'string') {
    const error = new Error('Password is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('fullName' in body)) {
    const error = new Error('Full name is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (typeof body.fullName !== 'string') {
    const error = new Error('Full name is not a string.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (!('receiveInsiderEmails' in body)) {
    const error = new Error('Receive insider emails is missing.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  if (typeof body.receiveInsiderEmails !== 'boolean') {
    const error = new Error('Receive insider emails is not a boolean.');
    error.name = errorName.clientSentInvalidData;
    throw error;
  }

  const validRequest = {
    credentialsNotSafe: {
      email: credentials.email,
      password: credentials.password,
    },
    fullName: body.fullName,
    receiveInsiderEmails: body.receiveInsiderEmails,
  };

  return validRequest;
};
