import { useRef } from 'react';
import {
  useFinishUploadMutation,
  useInitiateUploadMutation,
  useUploadPartMutation,
} from '../features/apiSlice';
import { isDataWithMessage, isObjectWithData } from '../utils/apiUtils';

export interface UploadParts {
  uploadId: string;
  parts: Array<{ partNumber: number; ETag: string | undefined }>;
}

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
      });

      if (initiateResponse.error) {
        if (
          isObjectWithData(initiateResponse.error) &&
          isDataWithMessage(initiateResponse.error.data)
        ) {
          throw new Error(initiateResponse.error.data.message);
        } else {
          throw new Error('Failed to initiate upload');
        }
      }

      uploadedParts.current = {
        uploadId: initiateResponse.data.uploadId,
        parts: [],
      };

      const chunksQueue = [
        ...initiateResponse.data.partsWithUploadUrls,
      ].reverse();

      onUploadStarted(chunksQueue.length);
      await sendNextChunk(
        file,
        chunksQueue,
        chunkSize,
        onUploadFinished,
        onChunkUploaded
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendNextChunk = async (
    file: File,
    chunksQueue: Array<{ partNumber: number; uploadUrl: string }>,
    chunkSize: number,
    onUploadFinished: () => void,
    onChunkUploaded: (uploadedChunkCount: number) => void
  ) => {
    if (chunksQueue.length === 0) {
      console.log('All chunks uploaded');

      if (!uploadedParts.current) {
        throw new Error('No uploaded parts');
      }

      await finishUpload({
        uploadId: uploadedParts.current.uploadId,
        parts: uploadedParts.current.parts,
      });

      onUploadFinished();
      return;
    }

    const part = chunksQueue.pop();

    if (!part) {
      console.log('No part in queue');
      return;
    }

    const begin = (part.partNumber - 1) * chunkSize;
    const end = begin + chunkSize;
    const chunk = file.slice(begin, end);

    try {
      const uploadResponse = await uploadPart({
        part: chunk,
        uploadUrl: part.uploadUrl,
      });

      uploadedParts.current?.parts.push({
        partNumber: part.partNumber,
        ETag: uploadResponse.data?.ETag || undefined,
      });

      onChunkUploaded(uploadedParts.current?.parts.length || 0);
      sendNextChunk(
        file,
        chunksQueue,
        chunkSize,
        onUploadFinished,
        onChunkUploaded
      );
    } catch (error) {
      console.log('Error uploading chunk', error);
      // on error we probably
      // want to push the part back
      // for retrying
      // chunksQueue.push(chunkId);
    }
  };

  return { upload };
};
