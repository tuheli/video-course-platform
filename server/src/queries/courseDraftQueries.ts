import { client } from '../database';
import { errorName } from '../errorNames';
import {
  CourseDraft,
  CourseType,
  KnownCourseCategory,
  NewCourseDraftEntry,
  TextWithId,
  TimeAvailablePerWeek,
  UpdateCourseGoalsRequestBody,
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

// NOTE: Instead of updating tables
// maybe it is better to delete and insert.
// The updates are done only on demand via saving.
// The user might have deleted, added, reordered
// and updated different texts which makes
// updating quite complex. Instead
// delete and insert can be very simple.

export const updateCourseDraftCourseGoals = async (
  courseDraftId: number,
  updateRequest: UpdateCourseGoalsRequestBody
): Promise<void> => {
  try {
    await client.query('BEGIN;');

    // NOTE: Ownership needs to be checked.
    const learningObjectivePromises =
      updateRequest.learningObjectives.items.map((learningObjective) => {
        const sqlText = `
        UPDATE learning_objectives
        SET 
          learning_objective = $1,
          order_index = $2
        WHERE id = $3 AND course_draft_id = $4;
      `;

        const sqlValues = [
          learningObjective.text,
          learningObjective.orderIndex,
          learningObjective.id,
          courseDraftId,
        ];

        return client.query(sqlText, sqlValues);
      });

    const intendedLearnerPromises = updateRequest.intendedLearners.items.map(
      (intendedLearner) => {
        const sqlText = `
        UPDATE intended_learners
        SET 
          intended_learner = $1,
          order_index = $2
        WHERE id = $3 AND course_draft_id = $4;
      `;

        const sqlValues = [
          intendedLearner.text,
          intendedLearner.orderIndex,
          intendedLearner.id,
          courseDraftId,
        ];

        return client.query(sqlText, sqlValues);
      }
    );

    const prerequisitePromises = updateRequest.prerequisites.items.map(
      (prerequisite) => {
        const sqlText = `
        UPDATE prerequisites
        SET 
          prerequisite = $1,
          order_index = $2
        WHERE id = $3 AND course_draft_id = $4;
      `;

        const sqlValues = [
          prerequisite.text,
          prerequisite.orderIndex,
          prerequisite.id,
          courseDraftId,
        ];

        return client.query(sqlText, sqlValues);
      }
    );

    await Promise.all(learningObjectivePromises);
    await Promise.all(intendedLearnerPromises);
    await Promise.all(prerequisitePromises);

    await client.query('COMMIT;');
    return;
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
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
