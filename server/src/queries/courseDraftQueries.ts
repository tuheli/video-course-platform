import { client } from '../database';
import { errorName } from '../errorNames';
import {
  CourseDraft,
  CourseType,
  KnownCourseCategory,
  NewCourseDraftEntry,
  TextWithId,
  TimeAvailablePerWeek,
} from '../routers/courseDraftsRouter';

// NOTE: The course draft returned is structured
// from the frontends perspective. For example,
// in frontend a specific structure is used for
// drag and drop reordering.

interface CourseDraftInDatabase {
  id: number;
  creatorId: number;
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

export const createCourseDraft = async (
  newCourseDraftEntry: NewCourseDraftEntry
): Promise<CourseDraft> => {
  try {
    await client.query('BEGIN;');

    const sqlCourseDraftText =
      'INSERT INTO coursedrafts (creator_id, creator_email, course_type, course_title, course_category, creator_time_available_per_week, is_public, is_submission_process_completed, language, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, creator_id, creator_email, course_type, course_title, course_category, creator_time_available_per_week, is_public, is_submission_process_completed, language, created_at;';

    const sqlCourseDraftValues = [
      newCourseDraftEntry.creatorId,
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
  const lineToTextWithId = (lineFromDatabase: string) => {
    const separator = ' ;sep; ';
    const parts = lineFromDatabase.split(separator);

    const textWithId: TextWithId = {
      id: parts[0],
      text: parts[1],
      orderIndex: parseInt(parts[2]),
    };

    return textWithId;
  };

  // NOTE: Is the separator okay to use?
  try {
    const selectCourseDraftQueryText = `
      SELECT 
        CD.id as course_draft_id,
        COALESCE(LO.learning_objectives, '{}') as learning_objectives,
        COALESCE(IL.intended_learners, '{}') as intended_learners,
        COALESCE(PR.prerequisites, '{}') as prerequisites,
        CD.creator_id, 
        CD.creator_email, 
        CD.course_type,
        CD.course_title, 
        CD.course_category, 
        CD.creator_time_available_per_week, 
        CD.is_public, 
        CD.is_submission_process_completed, 
        CD.language,
        CD.created_at
      FROM coursedrafts CD
      LEFT JOIN (
        SELECT 
          course_draft_id, 
          array_agg(DISTINCT id || ' ;sep; ' || learning_objective || ' ;sep; ' || order_index) as learning_objectives
        FROM learning_objectives
        GROUP BY course_draft_id
      ) LO ON CD.id = LO.course_draft_id
      LEFT JOIN (
        SELECT 
          course_draft_id, 
          array_agg(DISTINCT id || ' ;sep; ' || intended_learner || ' ;sep; ' || order_index) as intended_learners
        FROM intended_learners
        GROUP BY course_draft_id
      ) IL ON CD.id = IL.course_draft_id
      LEFT JOIN (
        SELECT 
          course_draft_id, 
          array_agg(DISTINCT id || ' ;sep; ' || prerequisite || ' ;sep; ' || order_index) as prerequisites
        FROM prerequisites
        GROUP BY course_draft_id
      ) PR ON CD.id = PR.course_draft_id
      WHERE CD.creator_id = $1;
    `;

    const selectCourseDraftQueryValues = [userId];

    const selectCourseDraftQueryResult = await client.query(
      selectCourseDraftQueryText,
      selectCourseDraftQueryValues
    );

    const courseDraftRows = selectCourseDraftQueryResult.rows;

    const courseDrafts: CourseDraft[] = courseDraftRows.map((row) => {
      const courseDrafts: CourseDraft = {
        id: row.course_draft_id,
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
            items: row.intended_learners.map((intendedLearner: any) => {
              return lineToTextWithId(intendedLearner);
            }),
            type: 'intendedLearners',
          },
          prerequisites: {
            items: row.prerequisites.map((prerequisite: any) => {
              return lineToTextWithId(prerequisite);
            }),
            type: 'prerequisites',
          },
          learningObjectives: {
            items: row.learning_objectives.map((learningObjective: any) => {
              return lineToTextWithId(learningObjective);
            }),
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
