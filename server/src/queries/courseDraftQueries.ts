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

interface DeleteLearningObjectiveParams {
  learningObjectiveId: number;
  userId: number;
}

interface DeletePrerequisiteParams {
  prerequisiteId: number;
  userId: number;
}

interface GetCourseDraftParams {
  userId: number;
  courseDraftId: number;
}

interface CreateTextWithId {
  userId: number;
  courseDraftId: number;
  text: string;
  orderIndex: number;
}

type CreatePrerequisiteParams = CreateTextWithId;
type CreateLearningObjectiveParams = CreateTextWithId;

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

export const createLearningObjective = async (
  params: CreateLearningObjectiveParams
): Promise<TextWithId> => {
  try {
    await client.query('BEGIN;');

    const sqlText = `
    INSERT INTO learning_objectives (course_draft_id, learning_objective, order_index)
    VALUES ((SELECT id FROM coursedrafts WHERE id = $1 AND creator_id = $2), $3, $4) RETURNING id, course_draft_id, learning_objective, order_index;
    `;

    const sqlValues = [
      params.courseDraftId,
      params.userId,
      params.text,
      params.orderIndex,
    ];

    const queryResult = await client.query(sqlText, sqlValues);

    if (queryResult.rowCount !== 1) {
      const error = new Error(
        'Returned row count is not 1 at create learning objective query.'
      );
      error.name = errorName.errorAtDatabase;
      throw error;
    }

    const createdRow = queryResult.rows[0];
    const createdLearningObjective: TextWithId = {
      id: createdRow.id,
      text: createdRow.learning_objective,
      orderIndex: createdRow.order_index,
    };

    await client.query('COMMIT;');
    return createdLearningObjective;
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const createPrerequisite = async (
  params: CreatePrerequisiteParams
): Promise<TextWithId> => {
  try {
    await client.query('BEGIN;');

    const sqlText = `
    INSERT INTO prerequisites (course_draft_id, prerequisite, order_index)
    VALUES ((SELECT id FROM coursedrafts WHERE id = $1 AND creator_id = $2), $3, $4) RETURNING id, course_draft_id, prerequisite, order_index;
    `;

    const sqlValues = [
      params.courseDraftId,
      params.userId,
      params.text,
      params.orderIndex,
    ];

    const queryResult = await client.query(sqlText, sqlValues);

    if (queryResult.rowCount !== 1) {
      const error = new Error(
        'Returned row count is not 1 at create prerequisite query.'
      );
      error.name = errorName.errorAtDatabase;
      throw error;
    }

    const createdRow = queryResult.rows[0];
    const createdPrerequisite: TextWithId = {
      id: createdRow.id,
      text: createdRow.learning_objective,
      orderIndex: createdRow.order_index,
    };

    await client.query('COMMIT;');
    return createdPrerequisite;
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const deleteLearningObjective = async (
  params: DeleteLearningObjectiveParams
) => {
  try {
    await client.query('BEGIN;');

    const sqlText = `
      DELETE
      FROM learning_objectives
      WHERE id = $1
      AND id IN (
        SELECT learning_objectives.id
        FROM learning_objectives
        JOIN coursedrafts
        ON learning_objectives.course_draft_id = coursedrafts.id
        WHERE coursedrafts.creator_id = $2
      );
    `;

    const sqlValues = [params.learningObjectiveId, params.userId];

    await client.query(sqlText, sqlValues);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const deletePrerequisite = async (params: DeletePrerequisiteParams) => {
  try {
    await client.query('BEGIN;');
    const sqlText = `
      DELETE
      FROM prerequisites
      WHERE id = $1
      AND id IN (
        SELECT prerequisites.id
        FROM prerequisites
        JOIN coursedrafts
        ON prerequisites.course_draft_id = coursedrafts.id
        WHERE coursedrafts.creator_id = $2
      );
    `;
    const sqlValues = [params.prerequisiteId, params.userId];
    await client.query(sqlText, sqlValues);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const updateCourseDraftCourseGoals = async (
  courseDraftId: number,
  updateRequest: UpdateCourseGoalsRequestBody
): Promise<void> => {
  try {
    await client.query('BEGIN;');

    const learningObjectivePromises =
      updateRequest.learningObjectives.items.map((learningObjective) => {
        const sqlText = `
          UPDATE learning_objectives
          SET 
            learning_objective = $1,
            order_index = $2
          WHERE id = $3
          AND id IN (
            SELECT learning_objectives.id
            FROM learning_objectives
            JOIN coursedrafts
            ON learning_objectives.course_draft_id = coursedrafts.id
            WHERE coursedrafts.creator_id = $4
          );
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
          WHERE id = $3
          AND id IN (
            SELECT intended_learners.id
            FROM intended_learners
            JOIN coursedrafts
            ON intended_learners.course_draft_id = coursedrafts.id
            WHERE coursedrafts.creator_id = $4
          );
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
          WHERE id = $3
          AND id IN (
            SELECT prerequisites.id
            FROM prerequisites
            JOIN coursedrafts
            ON prerequisites.course_draft_id = coursedrafts.id
            WHERE coursedrafts.creator_id = $4
          );
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

export const getCourseDraft = async (
  params: GetCourseDraftParams
): Promise<CourseDraftInDatabase | null> => {
  try {
    const sqlText = `
      SELECT 
      id, 
      creator_id, 
      creator_email, 
      course_type, 
      course_title, 
      course_category, 
      creator_time_available_per_week, 
      is_public, 
      is_submission_process_completed, 
      language, 
      created_at
      FROM coursedrafts
      WHERE id = $1 AND creator_id = $2;
    `;

    const sqlValues = [params.courseDraftId, params.userId];
    const queryResult = await client.query(sqlText, sqlValues);

    if (queryResult.rowCount !== 1) {
      return null;
    }

    const courseDraftRow = queryResult.rows[0];

    const courseDraft: CourseDraftInDatabase = {
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

    return courseDraft;
  } catch (error) {
    throw error;
  }
};
