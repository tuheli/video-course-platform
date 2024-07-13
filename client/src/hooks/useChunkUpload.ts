import { useRef } from 'react';
import {
  useFinishUploadMutation,
  useInitiateUploadMutation,
  useUploadPartMutation,
} from '../features/apiSlice';

export interface UploadParts {
  uploadId: string;
  parts: Array<{ partNumber: number; ETag: string | undefined }>;
}

// Uploading can be really slow on lower bandwith
// conections. The guide that the uploading is
// based on also has info on how to apply multithreading
// which could speed up the uploads in general.

// For reference see:
// https://medium.com/@pilovm/multithreaded-file-uploading-with-javascript-dafabce34ccd
// https://github.com/pilovm/multithreaded-uploader/blob/master/frontend/uploader.js
// https://blog.logrocket.com/multipart-uploads-s3-node-js-react/

export const useChunkUpload = () => {
  const [uploadPart] = useUploadPartMutation();
  const [initiateUpload] = useInitiateUploadMutation();
  const [finishUpload] = useFinishUploadMutation();
  const uploadedParts = useRef<UploadParts | null>(null);
  const chunkSize = Math.pow(1024, 2) * 50; // 50MB

  const upload = async (
    file: File,
    coursedraftId: number,
    sectionId: number,
    lectureId: number,
    onUploadStarted: (totalChunkCount: number) => void,
    onUploadFinished: () => void,
    onChunkUploaded: (uploadedChunkCount: number) => void
  ) => {
    try {
      const partCount = Math.ceil(file.size / chunkSize);

      const initiateResponse = await initiateUpload({
        partCount,
        coursedraftId,
        sectionId,
        lectureId,
      }).unwrap();

      console.log('@upload initiation was successful');

      uploadedParts.current = {
        uploadId: initiateResponse.uploadId,
        parts: [],
      };

      const chunksQueue = [...initiateResponse.partsWithUploadUrls].reverse();

      onUploadStarted(chunksQueue.length);
      await sendNextChunk(
        file,
        chunksQueue,
        chunkSize,
        onUploadFinished,
        onChunkUploaded
      );
    } catch (error) {
      throw error;
    }
  };

  const sendNextChunk = async (
    file: File,
    chunksQueue: Array<{ partNumber: number; uploadUrl: string }>,
    chunkSize: number,
    onUploadFinished: () => void,
    onChunkUploaded: (uploadedChunkCount: number) => void
  ) => {
    try {
      if (chunksQueue.length === 0) {
        if (!uploadedParts.current) {
          throw new Error('@sendnextchunk: uploadedParts ref current is null');
        }

        await finishUpload({
          uploadId: uploadedParts.current.uploadId,
          parts: uploadedParts.current.parts,
        }).unwrap();

        onUploadFinished();
        return;
      }

      const part = chunksQueue.pop();

      if (!part) {
        throw new Error(
          '@sendnextchunk: part to upload taken from chunksQueue is undefined'
        );
      }

      const begin = (part.partNumber - 1) * chunkSize;
      const end = begin + chunkSize;
      const chunk = file.slice(begin, end);

      console.log(`@sendNextChunk: uploading part ${part.partNumber}`);

      const uploadResponse = await uploadPart({
        part: chunk,
        uploadUrl: part.uploadUrl,
      }).unwrap();

      console.log(
        `@sendNextChunk: part ${part.partNumber} uploaded successfully`
      );

      uploadedParts.current?.parts.push({
        partNumber: part.partNumber,
        ETag: uploadResponse?.ETag || undefined,
      });

      onChunkUploaded(uploadedParts.current?.parts.length || 0);

      console.log(
        `@sendNextChunk: part ${part.partNumber} left awaiting for next parts to finish`
      );

      await sendNextChunk(
        file,
        chunksQueue,
        chunkSize,
        onUploadFinished,
        onChunkUploaded
      );

      console.log(`@sendNextChunk: part ${part.partNumber} exiting recursion`);
    } catch (error) {
      // On error its probably good to push the chunk back
      // to the queue for retrying. In that case would need to
      // think about how the ongoing recursion would affect the
      // process. Also retry counter is needed to stop
      // trying after a certain amount of retries.
      // chunksQueue.push(chunkId);
      throw error;
    }
  };

  return { upload };
};
