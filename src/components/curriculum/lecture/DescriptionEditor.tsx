import { Stack, Typography } from '@mui/material';
import { TextEditor } from '../../text-editor/TextEditor';

const placeholder =
  'Add a description. Include what students will be able to do after completing the lecture.';

export const DesctiptionEditor = () => {
  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
        }}
      >
        Lecture Description
      </Typography>
      <TextEditor placeholder={placeholder} />
    </Stack>
  );
};
