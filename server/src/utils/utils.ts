import fs from 'fs/promises';

// NOTE: For reference on the mp4 file format:
// https://www.cimarronsystems.com/wp-content/uploads/2017/04/Elements-of-the-H.264-VideoAAC-Audio-MP4-Movie-v2_0.pdf
// Check that for what is movie header atom (mvhd).

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

// READ THIS DISCLAIMER: There are no security checks for
// malicious data and this is only for
// showcase purposes on a local trusted device.

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

// This is a modified version of
// https://gist.github.com/Elements-/cf063254730cd754599e
// The original code was unable to find the mvhd atom
// on my windows computer. Hence the function searches
// for the mvhd atom through the whole file in chunks.

// The idea is to read a portion of the file at a time.
// Then the last 3 bytes of the previous chunk are
// added to the beginning of the next chunk to ensure
// that the mvhd atom is not split between two chunks.

// For example if we read 100 bytes at a time and the
// mvhd atom is 4 bytes long we could have the following
// situation:
// chunk 1: '...mvh'
// chunk 2: 'd...'
// In this case the mvhd atom would not be found from either.

const chunkSize = Math.pow(1024, 2);
const header = Buffer.from('mvhd');

export const getAudioLength = async (
  filePath: string
): Promise<number | undefined> => {
  const fileHandle = await fs.open(filePath, 'r');
  const { size } = await fileHandle.stat();

  const buffer = Buffer.alloc(chunkSize);
  const lastThreeBytesBuffer = Buffer.alloc(3);

  let isMvhdAtomFound = false;
  let headerIndex = -1;

  for (let i = 0; i < size; i += chunkSize) {
    const maxBytesToRead = Math.min(chunkSize - 3, size - i);
    const { bytesRead } = await fileHandle.read(buffer, 3, maxBytesToRead, i);

    if (bytesRead > 0) {
      const actualBytesRead = Math.min(bytesRead, maxBytesToRead);
      const lastBytesStart = Math.max(0, actualBytesRead - 3);

      buffer.copy(lastThreeBytesBuffer, 0, lastBytesStart, actualBytesRead);
      headerIndex = buffer.indexOf(header);

      isMvhdAtomFound = headerIndex !== -1;
      if (isMvhdAtomFound) {
        break;
      }

      buffer.fill(0);
      buffer.set(lastThreeBytesBuffer, 0);
    }
  }

  await fileHandle.close();

  if (!isMvhdAtomFound || headerIndex === -1) {
    console.log('Mvhd atom was not found in the file.');
    return undefined;
  }

  const start = headerIndex + 17;
  const timeScale = buffer.readUInt32BE(start);
  const duration = buffer.readUInt32BE(start + 4);
  const audioLength = Math.floor((duration / timeScale) * 1000) / 1000;

  const logObject = {
    buffer,
    header,
    start,
    timeScale,
    duration,
    audioLength,
  };

  console.log(logObject);

  buffer.fill(0);
  lastThreeBytesBuffer.fill(0);
  return audioLength;
};
