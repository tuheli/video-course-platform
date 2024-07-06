import {
  S3Client,
  CreateMultipartUploadCommand,
  CreateMultipartUploadCommandInput,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import {
  awsS3AccessKey,
  awsS3bucketName,
  awsS3bucketRegion,
  awsS3SecretAccessKey,
} from './config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: awsS3bucketRegion,
  credentials: {
    accessKeyId: awsS3AccessKey!,
    secretAccessKey: awsS3SecretAccessKey!,
  },
});

interface PresignUrlParams {
  uploadId: string;
  multipartUploadKey: string;
  partNumber: number;
}

interface InitiateMultipartUploadParams {
  partCount: number;
}

interface InitiateMultipartUploadResponse {
  uploadId: string;
  partsWithUploadUrls: Array<{ partNumber: number; uploadUrl: string }>;
}

const getPresignedUrl = async (params: PresignUrlParams) => {
  const key = crypto.randomUUID();
  const command: UploadPartCommand = new UploadPartCommand({
    Bucket: awsS3bucketName,
    PartNumber: params.partNumber,
    UploadId: params.uploadId,
    Key: params.multipartUploadKey,
  });
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 15, // 15 minutes
  });
  return url;
};

export const initiateMultipartUpload = async (
  params: InitiateMultipartUploadParams
): Promise<InitiateMultipartUploadResponse | null> => {
  const expirationTime = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes
  const multipartUploadKey = crypto.randomUUID();
  const input: CreateMultipartUploadCommandInput = {
    Bucket: awsS3bucketName,
    Key: multipartUploadKey,
    ContentType: 'video/*',
    Expires: expirationTime,
  };

  const getUploadIdCommand = new CreateMultipartUploadCommand(input);
  const getUploadIdResponse = await s3Client.send(getUploadIdCommand);

  if (getUploadIdResponse.UploadId === undefined) {
    return null;
  }

  const partsWithUploadUrls: Array<{ partNumber: number; uploadUrl: string }> =
    [];
  const partCountMap = Array.from(
    { length: params.partCount },
    (_, i) => i + 1
  );
  const promises = partCountMap.map((partNumber) => {
    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        const presignedUrl = await getPresignedUrl({
          partNumber,
          uploadId: getUploadIdResponse.UploadId!,
          multipartUploadKey,
        });
        partsWithUploadUrls.push({ partNumber, uploadUrl: presignedUrl });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  });

  await Promise.all(promises);

  return {
    uploadId: getUploadIdResponse.UploadId,
    partsWithUploadUrls,
  };
};
