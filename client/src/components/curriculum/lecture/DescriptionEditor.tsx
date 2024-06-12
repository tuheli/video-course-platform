import { Stack, Typography } from '@mui/material';
import { TextEditor } from '../../text-editor/TextEditor';
import { Descendant } from 'slate';
import { useLectureContext } from '../../../hooks/useLectureContext';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';
import { SaveAndCancelButton } from '../SaveAndCancelButton';
import {
  getLectureDescriptionLocalStorageKey,
  getStateFromLocalStorageOrDefault,
  saveToLocalStorage,
} from '../../text-editor/utils';

const placeholder =
  'Add a description. Include what students will be able to do after completing the lecture.';

interface DescriptionEditorProps {
  closeEditor: () => void;
}

export const DesctiptionEditor = ({ closeEditor }: DescriptionEditorProps) => {
  const { lecture } = useLectureContext();
  const { courseDraftId, curriculumSection } = useCurriculumSectionContext();

  const localStorageKey = getLectureDescriptionLocalStorageKey(
    courseDraftId,
    curriculumSection.id,
    lecture.id
  );

  const onChange = (value: Descendant[]) => {
    saveToLocalStorage(localStorageKey, value);
  };

  const initialValue = getStateFromLocalStorageOrDefault(localStorageKey);

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
