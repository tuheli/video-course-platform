import {
  S3Client,
  CreateMultipartUploadCommand,
  CreateMultipartUploadCommandInput,
} from '@aws-sdk/client-s3';
import {
  awsS3AccessKey,
  awsS3bucketName,
  awsS3bucketRegion,
  awsS3SecretAccessKey,
} from './config';

const s3Client = new S3Client({
  region: awsS3bucketRegion,
  credentials: {
    accessKeyId: awsS3AccessKey!,
    secretAccessKey: awsS3SecretAccessKey!,
  },
});

/** Requests an id number for identifying
 * to which entity separately uploaded
 * parts belong to.
 */
export const initiateMultipartUpload = async () => {
  const expirationMinutes = 30;
  const expirationTime = new Date(Date.now() + 1000 * 60 * expirationMinutes);
  const key = crypto.randomUUID();

  const input: CreateMultipartUploadCommandInput = {
    Bucket: awsS3bucketName,
    Key: key,
    ContentType: 'video/mp4',
    Expires: expirationTime,
  };

  const command = new CreateMultipartUploadCommand(input);
  const response = await s3Client.send(command);

  if (!response.UploadId) {
    return null;
  }

  const returnValue = {
    key: key as string,
    uploadId: response.UploadId,
    expirationTime: expirationTime.toISOString(),
    creationTime: new Date().toISOString(),
  };
  return returnValue;
};
