import { Container } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import {
  useInitiateUploadMutation,
  useUploadPartMutation,
} from '../../features/apiSlice';

interface PartUploads {
  uploadId: string;
  parts: Map<number, { partNumber: number; ETag: string | undefined }>;
}

export const ChunkUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadPart] = useUploadPartMutation();
  const [initiateUpload] = useInitiateUploadMutation();
  const uploadedParts = useRef<PartUploads | null>(null);
  const chunkSize = Math.pow(1024, 2) * 5; // 15MB

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const onClickUpload = async () => {
    if (!file) return;
    try {
      const partCount = Math.ceil(file.size / chunkSize);
      const initiateResponse = await initiateUpload({ partCount });
      if (!initiateResponse.data) {
        throw new Error('No data in initiate response');
      }
      uploadedParts.current = {
        uploadId: initiateResponse.data.uploadId,
        parts: new Map(),
      };
      const chunksQueue = [
        ...initiateResponse.data.partsWithUploadUrls,
      ].reverse();
      debugger;
      await sendNextChunk(file, chunksQueue, chunkSize);
    } catch (error) {
      console.log('Error uploading file', error);
    }
  };

  const sendNextChunk = async (
    file: File,
    chunksQueue: Array<{ partNumber: number; uploadUrl: string }>,
    chunkSize: number
  ) => {
    if (chunksQueue.length === 0) {
      console.log('All chunks uploaded');
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

      uploadedParts.current?.parts.set(part.partNumber, {
        partNumber: part.partNumber,
        ETag: uploadResponse.data?.ETag || undefined,
      });

      sendNextChunk(file, chunksQueue, chunkSize);
    } catch (error) {
      console.log('Error uploading chunk', error);
      // on error we probably
      // want to push the part back
      // for retrying
      // chunksQueue.push(chunkId);
    }
  };

  return (
    <Container
      sx={{
        py: 4,
        mt: 16,
        bgcolor: (theme) => theme.palette.background.paper,
      }}
    >
      <div>Hello</div>
      <input type="file" accept="video/*" onChange={onChangeFile} />
      {file && (
        <>
          <div>{file.name}</div>
          <button onClick={onClickUpload}>Upload</button>
        </>
      )}
    </Container>
  );
};

// const messageDigestBuffer = await chunk.arrayBuffer();
// const messageDigestHashBuffer = await crypto.subtle.digest(
//   'md5',
//   messageDigestBuffer
// );
// const hashArray = Array.from(new Uint8Array(messageDigestHashBuffer));
// const hashHex = hashArray
//   .map((b) => b.toString(16).padStart(2, '0'))
//   .join('');
// const match = hashHex.match(/\w{2}/g);
// if (!match) {
//   console.log('Error hashing chunk');
//   return;
// }
// const hashBase64 = btoa(
//   match.map((b) => String.fromCharCode(parseInt(b, 16))).join('')
// );
