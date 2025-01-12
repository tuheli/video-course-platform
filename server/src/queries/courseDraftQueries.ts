import { client } from '../database';
import { errorName } from '../errorNames';
import {
  CourseDraft,
  CourseDraftInDatabase,
  CreateCurriculumSectionParams,
  CreateLearningObjectiveParams,
  CreateLessonParams,
  CreatePrerequisiteParams,
  DeleteIntendedLearnerParams,
  DeleteLearningObjectiveParams,
  DeleteLessonParams,
  DeletePrerequisiteParams,
  DeleteSectionParams,
  GetCourseDraftParams,
  GetVideoUriParams,
  ICurriculumSection,
  Lesson,
  NewCourseDraftEntry,
  UpdateCourseDraftCourseGoalsParams,
  UpdateCurriculumSectionsParams,
  UpdateLessonReturnValue,
  UpdateLessonVideoParams,
} from '../types';
import {
  CourseType,
  KnownCourseCategory,
  TextWithId,
  TimeAvailablePerWeek,
} from '../types';

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

export const createCurriculumSection = async (
  params: CreateCurriculumSectionParams
) => {
  try {
    await client.query('BEGIN;');

    const { courseDraftId, userId } = params;

    const sqlText = `
      INSERT INTO curriculum_sections (
        course_draft_id,
        title,
        learning_objective,
        order_index
      )
      VALUES (
        (
          SELECT id
          FROM coursedrafts
          WHERE id = $1 AND creator_id = $2
        ),
        'Untitled Section',
        '',
        COALESCE (
          (
            SELECT MAX(order_index + 1)
            FROM curriculum_sections
            WHERE course_draft_id = $1
          ),
          1
        )
      )
    `;

    const sqlValues = [courseDraftId, userId];

    await client.query(sqlText, sqlValues);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
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

export const createIntendedLearner = async (
  params: CreatePrerequisiteParams
): Promise<TextWithId> => {
  try {
    await client.query('BEGIN;');

    const sqlText = `
    INSERT INTO intended_learners (course_draft_id, intended_learner, order_index)
    VALUES ((SELECT id FROM coursedrafts WHERE id = $1 AND creator_id = $2), $3, $4) RETURNING id, course_draft_id, intended_learner, order_index;
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
        'Returned row count is not 1 at create intended learner query.'
      );
      error.name = errorName.errorAtDatabase;
      throw error;
    }

    const createdRow = queryResult.rows[0];
    const createdIntendedLearner: TextWithId = {
      id: createdRow.id,
      text: createdRow.intended_learner,
      orderIndex: createdRow.order_index,
    };

    await client.query('COMMIT;');
    return createdIntendedLearner;
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const createLesson = async (
  params: CreateLessonParams
): Promise<void> => {
  try {
    await client.query('BEGIN;');

    const sqlText = `
    INSERT INTO lessons (
      curriculum_section_id, 
      name, 
      order_index,
      description,
      video_url,
      video_length_seconds
    )
    VALUES (
      (
        SELECT id
        FROM curriculum_sections
        WHERE id = $1
        AND course_draft_id IN (
          SELECT id
          FROM coursedrafts
          WHERE creator_id = $2
        )
      ),
      $3,
      COALESCE (
        (
          SELECT MAX(order_index + 1)
          FROM lessons
          WHERE curriculum_section_id = $1
      ), 1),
      '[{"type":"paragraph","children":[{"text":""}]}]',
      '',
      0
    );
    `;

    const sqlValues = [params.curriculumSectionId, params.userId, params.title];

    await client.query(sqlText, sqlValues);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const getCourseDrafts = async (
  userId: number
): Promise<CourseDraft[]> => {
  try {
    const query = `
      SELECT
        coursedrafts.id,
        coursedrafts.creator_id,
        coursedrafts.creator_email,
        coursedrafts.course_title,
        coursedrafts.course_type,
        coursedrafts.course_category,
        coursedrafts.creator_time_available_per_week,
        coursedrafts.is_public,
        coursedrafts.is_submission_process_completed,
        coursedrafts.language,
        coursedrafts.created_at,
        COALESCE(learning_objectives_json, '[]') AS learning_objectives,
        COALESCE(intended_learners_json, '[]') AS intended_learners,
        COALESCE(prerequisites_json, '[]') AS prerequisites,
        COALESCE(sections, '[]') AS sections
      FROM 
        coursedrafts
      LEFT JOIN (
        SELECT
          course_draft_id,
          json_agg(
            json_build_object(
              'id', id,
              'learning_objective', learning_objective,
              'order_index', order_index
            )
          ) AS learning_objectives_json
        FROM learning_objectives
        GROUP BY course_draft_id
      ) LO ON coursedrafts.id =  LO.course_draft_id
      LEFT JOIN (
        SELECT
          course_draft_id,
          json_agg(
            json_build_object(
              'id', id,
              'intended_learner', intended_learner,
              'order_index', order_index
            )
          ) AS intended_learners_json
        FROM intended_learners
        GROUP BY course_draft_id
      ) IL ON coursedrafts.id =  IL.course_draft_id
      LEFT JOIN (
        SELECT
          course_draft_id,
          json_agg(
            json_build_object(
              'id', id,
              'prerequisite', prerequisite,
              'order_index', order_index
            )
          ) AS prerequisites_json
        FROM prerequisites
        GROUP BY course_draft_id
      ) PR ON coursedrafts.id =  PR.course_draft_id
      LEFT JOIN (
        SELECT
          course_draft_id,
          json_agg(
            json_build_object(
              'section_id', section_id,
              'title', title,
              'learning_objective', learning_objective,
              'order_index', order_index,
              'lessons', COALESCE(lessons, '[]')
            )
          ) AS sections
        FROM (
          SELECT
            curriculum_sections.id AS section_id,
            curriculum_sections.course_draft_id,
            curriculum_sections.title,
            curriculum_sections.learning_objective,
            curriculum_sections.order_index,
            json_agg(
              json_build_object(
                'id', lessons.id,
                'title', lessons.name,
                'order_index', lessons.order_index,
                'description', lessons.description
              )
            ) FILTER (WHERE lessons.id IS NOT NULL) AS lessons
          FROM curriculum_sections
          LEFT JOIN lessons ON curriculum_sections.id = lessons.curriculum_section_id
          GROUP BY curriculum_sections.id
        ) AS section_details
        GROUP BY course_draft_id
      ) SEC ON coursedrafts.id = SEC.course_draft_id
      WHERE coursedrafts.creator_id = $1
      ;
    `;

    const result = await client.query(query, [userId]);
    const courseDrafts: CourseDraft[] = result.rows.map((row) => {
      const courseDraft: CourseDraft = {
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
        createdAt: row.created_at,
        enrollments: [],
        ratings: [],
        courseContent: {
          curriculum: row.sections.map((section: any) => {
            const sectionObject: ICurriculumSection = {
              id: section.section_id,
              title: section.title,
              learningObjective: section.learning_objective,
              orderIndex: section.order_index,
              lessons: section.lessons.map((lesson: any) => {
                const lessonObject: Lesson = {
                  id: lesson.id,
                  name: lesson.title,
                  orderIndex: lesson.order_index,
                  description: lesson.description,
                  video: {
                    url: '',
                    lengthSeconds: 0,
                  },
                };
                return lessonObject;
              }),
            };
            return sectionObject;
          }),
          intendedLearners: {
            items: row.intended_learners.map((intendedLearner: any) => {
              return {
                id: intendedLearner.id,
                text: intendedLearner.intended_learner,
                orderIndex: intendedLearner.order_index,
              };
            }),
            type: 'intendedLearners',
          },
          prerequisites: {
            items: row.prerequisites.map((prerequisite: any) => {
              return {
                id: prerequisite.id,
                text: prerequisite.prerequisite,
                orderIndex: prerequisite.order_index,
              };
            }),
            type: 'prerequisites',
          },
          learningObjectives: {
            items: row.learning_objectives.map((learningObjective: any) => {
              return {
                id: learningObjective.id,
                text: learningObjective.learning_objective,
                orderIndex: learningObjective.order_index,
              };
            }),
            type: 'learningObjectives',
          },
          videoContentLengthSeconds: 0,
        },
      };
      return courseDraft;
    });

    return courseDrafts;
  } catch (error) {
    (error as Error).message += '@getCourseDraftsNew';
    throw error;
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

export const getVideoPath = async (
  params: GetVideoUriParams
): Promise<string | undefined> => {
  try {
    const sqlText = `
      SELECT video_url
      FROM lessons
      WHERE lessons.id = $1;
    `;

    const sqlValues = [params.lessonId];
    const queryResult = await client.query(sqlText, sqlValues);

    if (queryResult.rowCount !== 1) {
      return undefined;
    }

    const row = queryResult.rows[0];

    if (row.video_url === '') {
      return undefined;
    }

    const videoPath = row.video_url;
    return videoPath;
  } catch (error) {
    throw error;
  }
};

export const updateCourseDraftCourseGoals = async (
  params: UpdateCourseDraftCourseGoalsParams
): Promise<void> => {
  try {
    await client.query('BEGIN;');

    const { updateRequest } = params;

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
            WHERE coursedrafts.creator_id = $4 AND coursedrafts.id = $5
          );
        `;

        const sqlValues = [
          learningObjective.text,
          learningObjective.orderIndex,
          learningObjective.id,
          params.userId,
          params.courseDraftId,
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
            WHERE coursedrafts.creator_id = $4 AND coursedrafts.id = $5
          );
        `;

        const sqlValues = [
          intendedLearner.text,
          intendedLearner.orderIndex,
          intendedLearner.id,
          params.userId,
          params.courseDraftId,
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
            WHERE coursedrafts.creator_id = $4 AND coursedrafts.id = $5
          );
        `;

        const sqlValues = [
          prerequisite.text,
          prerequisite.orderIndex,
          prerequisite.id,
          params.userId,
          params.courseDraftId,
        ];

        return client.query(sqlText, sqlValues);
      }
    );

    await Promise.all(learningObjectivePromises);
    await Promise.all(intendedLearnerPromises);
    await Promise.all(prerequisitePromises);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const updateCurriculumSections = async (
  params: UpdateCurriculumSectionsParams
) => {
  try {
    await client.query('BEGIN;');

    const { requestBody } = params;

    const sqlSectionPromises = requestBody.entries.map(
      ({ id, title, learningObjective, orderIndex }) => {
        const sqlText = `
        UPDATE curriculum_sections
        SET 
          title = $1,
          learning_objective = $2,
          order_index = $3
        WHERE id = $4
        AND id IN (
          SELECT curriculum_sections.id
          FROM curriculum_sections
          JOIN coursedrafts
          ON coursedrafts.id = curriculum_sections.course_draft_id
          WHERE coursedrafts.creator_id = $5 AND coursedrafts.id = $6
        );
      `;

        const sqlSectionValues = [
          title,
          learningObjective,
          orderIndex,
          id,
          params.userId,
          params.courseDraftId,
        ];

        return client.query(sqlText, sqlSectionValues);
      }
    );

    const sqlLessonPromises = requestBody.entries.flatMap((section) => {
      const lessonPromises = section.lessons.map((lesson) => {
        const sqlText = `
          UPDATE lessons
          SET 
            name = $1,
            description = $2,
            order_index = $3
          WHERE id = $4
          AND id IN (
            SELECT lessons.id
            FROM lessons
            JOIN curriculum_sections
            ON curriculum_sections.id = lessons.curriculum_section_id
            JOIN coursedrafts
            ON coursedrafts.id = curriculum_sections.course_draft_id
            WHERE coursedrafts.creator_id = $5 AND coursedrafts.id = $6
          );
        `;

        const sqlValues = [
          lesson.name,
          lesson.description,
          lesson.orderIndex,
          lesson.id,
          params.userId,
          params.courseDraftId,
        ];

        return client.query(sqlText, sqlValues);
      });

      return lessonPromises;
    });

    await Promise.all(sqlSectionPromises);
    await Promise.all(sqlLessonPromises);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const updateLessonVideo = async (
  params: UpdateLessonVideoParams
): Promise<UpdateLessonReturnValue> => {
  try {
    await client.query('BEGIN;');

    const sqlText = `
      UPDATE lessons
      SET 
        video_url = $1,
        video_length_seconds = $2,
        video_size_in_bytes = $3
      WHERE id = $4
      AND id IN (
        SELECT lessons.id
        FROM lessons
        JOIN curriculum_sections
        ON curriculum_sections.id = lessons.curriculum_section_id
        JOIN coursedrafts
        ON coursedrafts.id = curriculum_sections.course_draft_id
        WHERE coursedrafts.creator_id = $5
      )
      RETURNING video_url, video_length_seconds, video_size_in_bytes;
    `;

    const sqlValues = [
      params.videoUrl,
      params.videoLengthSeconds,
      params.videoSizeInBytes,
      params.lessonId,
      params.userId,
    ];

    const queryResult = await client.query(sqlText, sqlValues);
    const row = queryResult.rows[0];

    const returnValue: UpdateLessonReturnValue = {
      videoFileName: row.video_url,
      videoSizeInBytes: row.video_size_in_bytes,
      videoLengthSeconds: row.video_length_seconds,
    };

    await client.query('COMMIT;');
    return returnValue;
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

export const deleteIntendedLearner = async (
  params: DeleteIntendedLearnerParams
) => {
  try {
    await client.query('BEGIN;');
    const sqlText = `
      DELETE
      FROM intended_learners
      WHERE id = $1
      AND id IN (
        SELECT intended_learners.id
        FROM intended_learners
        JOIN coursedrafts
        ON intended_learners.course_draft_id = coursedrafts.id
        WHERE coursedrafts.creator_id = $2
      );
    `;
    const sqlValues = [params.intendedLearnerId, params.userId];
    await client.query(sqlText, sqlValues);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const deleteLesson = async (params: DeleteLessonParams) => {
  try {
    await client.query('BEGIN;');
    const sqlText = `
      DELETE
      FROM lessons
      WHERE id = $1
      AND id IN (
        SELECT lessons.id
        FROM lessons
        JOIN curriculum_sections
        ON lessons.curriculum_section_id = curriculum_sections.id
        JOIN coursedrafts
        ON curriculum_sections.course_draft_id = coursedrafts.id
        WHERE coursedrafts.creator_id = $2
      );
    `;
    const sqlValues = [params.lessonId, params.userId];
    await client.query(sqlText, sqlValues);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};

export const deleteSection = async (params: DeleteSectionParams) => {
  try {
    await client.query('BEGIN;');
    const sqlText = `
      DELETE
      FROM curriculum_sections
      WHERE id = $1
      AND id IN (
        SELECT curriculum_sections.id
        FROM curriculum_sections
        JOIN coursedrafts
        ON curriculum_sections.course_draft_id = coursedrafts.id
        WHERE coursedrafts.creator_id = $2
      );
    `;
    const sqlValues = [params.sectionId, params.userId];
    await client.query(sqlText, sqlValues);
    await client.query('COMMIT;');
  } catch (error) {
    await client.query('ROLLBACK;');
    throw error;
  }
};
