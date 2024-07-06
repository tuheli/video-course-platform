import { client } from '../database';

interface CreateMultipartUploadParams {
  key: string;
  uploadId: string;
  expirationTime: string;
  creationTime: string;
}

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
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      false
    ) RETURNING
      id,
      upload_id,
      key,
      expiration_time,
      creation_time,
      is_finished 
    ;
  `;

  const values = [
    params.uploadId,
    params.key,
    params.expirationTime,
    params.creationTime,
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
    (error as Error).message += ' @createMultipartUpload';
    throw error;
  }
};
