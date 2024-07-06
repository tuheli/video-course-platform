import { Container } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useUploadChunkMutation } from '../../features/apiSlice';

export const ChunkUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadChunk] = useUploadChunkMutation();
  const chunkSize = Math.pow(1024, 2) * 5; // 5MB
  const fileId = 1;

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const onClickUpload = async () => {
    if (!file) return;
    try {
      const chunks = Math.ceil(file.size / chunkSize);
      const chunksQueue = Array.from({ length: chunks }, (_, i) => i).reverse();
      await sendNextChunk(file, chunksQueue, chunkSize, fileId);
    } catch (error) {}
  };

  const sendNextChunk = async (
    file: File,
    chunksQueue: number[],
    chunkSize: number,
    fileId: number
  ) => {
    if (chunksQueue.length === 0) {
      console.log('All chunks uploaded');
      return;
    }

    const chunkId = chunksQueue.pop();

    if (chunkId === undefined) {
      console.log('Chunk ID is undefined');
      return;
    }

    const begin = chunkId * chunkSize;
    const end = begin + chunkSize;
    const chunk = file.slice(begin, end);

    try {
      await uploadChunk({
        chunk,
        chunkId,
        fileId,
        fileName: file.name,
        fileSize: file.size,
      });
      sendNextChunk(file, chunksQueue, chunkSize, fileId);
    } catch (error) {
      console.log('Error uploading chunk');
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
