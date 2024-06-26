import { Stack, Typography } from '@mui/material';
import { TextEditor } from '../../text-editor/TextEditor';
import { Descendant } from 'slate';
import { SaveAndCancelButton } from '../SaveAndCancelButton';
import {
  getLectureDescriptionLocalStorageKey,
  getParsedSlateEditorStateFromLocalStorageOrDefault,
  saveToLocalStorage,
} from '../../text-editor/utils';

const placeholder =
  'Add a description. Include what students will be able to do after completing the lecture.';

export interface DescriptionEditorProps {
  courseDraftId: number;
  sectionId: number;
  lectureId: number;
  closeEditor: () => void;
}

export const DesctiptionEditor = ({
  courseDraftId,
  sectionId,
  lectureId,
  closeEditor,
}: DescriptionEditorProps) => {
  const localStorageKey = getLectureDescriptionLocalStorageKey(
    courseDraftId,
    sectionId,
    lectureId
  );

  const onChange = (value: Descendant[]) => {
    saveToLocalStorage(localStorageKey, value);
  };

  const initialValue =
    getParsedSlateEditorStateFromLocalStorageOrDefault(localStorageKey);

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
      <TextEditor
        placeholder={placeholder}
        initialValue={initialValue}
        onChange={onChange}
      />
      <SaveAndCancelButton
        saveButtonText="Save Description"
        onClickCancel={closeEditor}
        onClickSave={closeEditor}
      />
    </Stack>
  );
};
