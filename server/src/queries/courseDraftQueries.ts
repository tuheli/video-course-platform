import { client } from '../database';
import { errorName } from '../errorNames';
import {
  CourseDraft,
  CourseType,
  KnownCourseCategory,
  NewCourseDraftEntry,
  TimeAvailablePerWeek,
} from '../routers/courseDraftsRouter';

interface CourseDraftInDatabase {
  id: number;
  creatorId: number;
  curriculumId: number;
  creatorEmail: string;
  courseType: string;
  courseTitle: string;
  courseCategory: string;
  creatorTimeAvailablePerWeek: string;
  isPublic: boolean;
  isSubmissionProcessCompleted: boolean;
  language: string;
  createdAt: string;
}

interface CurriculumInDatabase {
  id: number;
}

type GetCourseDraftFromDatabaseResult = Omit<
  CourseDraftInDatabase,
  'id' | 'curriculumId'
>;

export const createCourseDraft = async (
  newCourseDraftEntry: NewCourseDraftEntry
): Promise<CourseDraft> => {
  try {
    await client.query('BEGIN;');

    // 1. Row for curriculum
    const sqlCurriculumText =
      'INSERT INTO curriculums DEFAULT VALUES RETURNING id;';
    const curriculumQueryResult = await client.query(sqlCurriculumText);

    if (curriculumQueryResult.rowCount !== 1) {
      const error = new Error(
        'Returned row count is not 1 at create curriculum query.'
      );
      error.name = errorName.errorAtDatabase;
      throw error;
    }

    const curriculumRow = curriculumQueryResult.rows[0];

    const curriculumInDatabase: CurriculumInDatabase = {
      id: curriculumRow.id,
    };

    // 2. Row for course draft
    const sqlCourseDraftText =
      'INSERT INTO coursedrafts (creator_id, curriculum_id, creator_email, course_type, course_title, course_category, creator_time_available_per_week, is_public, is_submission_process_completed, language, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, creator_id, creator_email, course_type, course_title, course_category, creator_time_available_per_week, is_public, is_submission_process_completed, language, created_at;';

    const sqlCourseDraftValues = [
      newCourseDraftEntry.creatorId,
      curriculumInDatabase.id,
      newCourseDraftEntry.creatorEmail,
      newCourseDraftEntry.courseType,
      newCourseDraftEntry.courseTitle,
      newCourseDraftEntry.courseCategory,
      newCourseDraftEntry.creatorTimeAvailablePerWeek,
      false,
      false,
      'English',
      new Date().toISOString(),
    ];

    const courseDraftQueryResult = await client.query(
      sqlCourseDraftText,
      sqlCourseDraftValues
    );

    if (courseDraftQueryResult.rowCount !== 1) {
      const error = new Error(
        'Returned row count is not 1 at create course draft query.'
      );
      error.name = errorName.errorAtDatabase;
      throw error;
    }

    const courseDraftRow = courseDraftQueryResult.rows[0];

    const createdCourseDraftInDatabase: CourseDraftInDatabase = {
      id: courseDraftRow.id,
      curriculumId: curriculumInDatabase.id,
      creatorId: courseDraftRow.creator_id,
      creatorEmail: courseDraftRow.creator_email,
      courseType: courseDraftRow.course_type,
      courseTitle: courseDraftRow.course_title,
      courseCategory: courseDraftRow.course_category,
      creatorTimeAvailablePerWeek:
        courseDraftRow.creator_time_available_per_week,
      isPublic: courseDraftRow.is_public,
      isSubmissionProcessCompleted:
        courseDraftRow.is_submission_process_completed,
      language: courseDraftRow.language,
      createdAt: courseDraftRow.created_at,
    };

    // NOTE: The course draft returned is structured
    // from the frontends perspective. For example,
    // in frontend the structure is used for
    // drag and drop reordering.

    // NOTE: The asserted types are typed in
    // database. Hence they are asserted here and
    // not validated.

    const createdCourseDraft: CourseDraft = {
      id: createdCourseDraftInDatabase.id,
      creatorId: createdCourseDraftInDatabase.creatorId,
      creatorEmail: createdCourseDraftInDatabase.creatorEmail,
      courseType: createdCourseDraftInDatabase.courseType as CourseType,
      courseTitle: createdCourseDraftInDatabase.courseTitle,
      courseCategory:
        createdCourseDraftInDatabase.courseCategory as KnownCourseCategory,
      creatorTimeAvailablePerWeek:
        createdCourseDraftInDatabase.creatorTimeAvailablePerWeek as TimeAvailablePerWeek,
      isPublic: createdCourseDraftInDatabase.isPublic,
      isSubmissionProcessCompleted:
        createdCourseDraftInDatabase.isSubmissionProcessCompleted,
      courseContent: {
        curriculum: [],
        intendedLearners: {
          items: [],
          type: 'intendedLearners',
        },
        prerequisites: {
          items: [],
          type: 'prerequisites',
        },
        learningObjectives: {
          items: [],
          type: 'learningObjectives',
        },
        videoContentLengthSeconds: 0,
      },
      enrollments: [],
      ratings: [],
      language: createdCourseDraftInDatabase.language,
      createdAt: createdCourseDraftInDatabase.createdAt,
    };

    await client.query('COMMIT;');

    return createdCourseDraft;
  } catch (error) {
    await client.query('ROLLBACK;');

    if (!(error instanceof Error)) {
      const unknownError = new Error(
        'Unkonwn error at createCourseDraft. Error object is not an instance of Error.'
      );
      unknownError.name = errorName.unknownError;
      throw unknownError;
    }

    const newError = new Error(
      `Error at createCourseDraft. Error message: ${error.message}`
    );
    newError.name = errorName.errorAtDatabase;
    throw newError;
  }
};

export const getCourseDrafts = async (
  userId: number
): Promise<CourseDraft[]> => {
  try {
    // 1. Get course draft row
    const selectCourseDraftQueryText =
      'SELECT id, creator_id, creator_email, course_type, course_title, course_category, creator_time_available_per_week, is_public, is_submission_process_completed, language, created_at FROM coursedrafts WHERE creator_id = $1';

    const selectCourseDraftQueryValues = [userId];

    const selectCourseDraftQueryResult = await client.query(
      selectCourseDraftQueryText,
      selectCourseDraftQueryValues
    );

    const courseDraftRows = selectCourseDraftQueryResult.rows;

    // NOTE: The structure is how the frontend
    // needs the data.

    // NOTE: Not fully implemented.
    const courseDrafts: CourseDraft[] = courseDraftRows.map((row) => {
      const courseDrafts: CourseDraft = {
        id: row.id,
        creatorId: row.creator_id,
        creatorEmail: row.creator_email,
        courseType: row.course_type,
        courseTitle: row.course_title,
        courseCategory: row.course_category,
        creatorTimeAvailablePerWeek: row.creator_time_available_per_week,
        isPublic: row.is_public,
        isSubmissionProcessCompleted: row.is_submission_process_completed,
        language: row.language,
        courseContent: {
          curriculum: [],
          intendedLearners: {
            items: [],
            type: 'intendedLearners',
          },
          prerequisites: {
            items: [],
            type: 'prerequisites',
          },
          learningObjectives: {
            items: [],
            type: 'learningObjectives',
          },
          videoContentLengthSeconds: 0,
        },
        enrollments: [],
        ratings: [],
        createdAt: row.created_at,
      };

      return courseDrafts;
    });

    return courseDrafts;
  } catch (error) {
    if (!(error instanceof Error)) {
      const unknownError = new Error(
        'Unkonwn error at getCourseDraft. Error object is not an instance of Error.'
      );
      unknownError.name = errorName.unknownError;
      throw unknownError;
    }

    const newError = new Error(
      `Error at getCourseDraft. Error message: ${error.message}`
    );
    newError.name = errorName.errorAtDatabase;
    throw newError;
  }
};
