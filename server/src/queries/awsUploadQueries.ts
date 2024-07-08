import { client } from '../database';

interface CreateMultipartUploadParams {
  key: string;
  uploadId: string;
  userId: number;
  lessonId: number;
  expirationTime: string;
  creationTime: string;
}

interface FinishMultipartUploadParams {
  uploadId: string;
  userId: number;
}

export const getUploadedVideoKey = async (
  lessonId: number,
  userId: number
): Promise<string | null> => {
  const query = `
    SELECT key
    FROM aws_s3_multipart_uploads
    WHERE lesson_id = $1
    AND user_id = $2
    AND is_finished = true
  ;`;

  const values = [lessonId, userId];

  try {
    const result = await client.query(query, values);
    if (result.rowCount === 0) return null;
    return result.rows[0].key;
  } catch (error) {
    (error as Error).message += ' @getPresignedVideoUrl';
    throw error;
  }
};

export const getKeyByUploadId = async (uploadId: string): Promise<string> => {
  const query = `
    SELECT key
    FROM aws_s3_multipart_uploads
    WHERE upload_id = $1
    LIMIT 1
  `;

  const values = [uploadId];

  try {
    const result = await client.query(query, values);
    return result.rows[0].key;
  } catch (error) {
    (error as Error).message += ' @getKeyByUploadId';
    throw error;
  }
};

export const finishMultipartUpload = async (
  params: FinishMultipartUploadParams
) => {
  try {
    const query = `
      UPDATE aws_s3_multipart_uploads
      SET is_finished = true
      WHERE upload_id = $1 AND user_id = $2;
      `;
    const values = [params.uploadId, params.userId];
    await client.query('BEGIN');
    await client.query(query, values);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    (error as Error).message += ' @finishMultipartUpload';
    throw error;
  }
};

export const createMultipartUpload = async (
  params: CreateMultipartUploadParams
) => {
  const query = `
    INSERT INTO aws_s3_multipart_uploads (
      upload_id,
      key,
      expiration_time,
      creation_time,
      is_finished,
      user_id,
      lesson_id
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      false,
      $5,
      (
        SELECT lessons.id
        FROM lessons
        LEFT JOIN curriculum_sections
        ON lessons.curriculum_section_id = curriculum_sections.id
        LEFT JOIN coursedrafts ON curriculum_sections.course_draft_id = coursedrafts.id
        WHERE lessons.id = $6
        AND coursedrafts.creator_id = $5
      )
    ) RETURNING
      id,
      upload_id,
      key,
      expiration_time,
      creation_time,
      is_finished,
      user_id,
      lesson_id
    ;
  `;

  const values = [
    params.uploadId,
    params.key,
    params.expirationTime,
    params.creationTime,
    params.userId,
    params.lessonId,
  ];

  try {
    await client.query('BEGIN');
    const result = await client.query(query, values);
    const row = result.rows[0];
    const returnValue = {
      id: row.id,
      uploadId: row.upload_id,
      key: row.key,
      expirationTime: row.expiration_time,
      creationTime: row.creation_time,
    };
    await client.query('COMMIT');
    return returnValue;
  } catch (error) {
    await client.query('ROLLBACK');
    (error as Error).message += ' @createMultipartUpload';
    throw error;
  }
};
