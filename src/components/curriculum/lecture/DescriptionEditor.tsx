import { Stack, Typography } from '@mui/material';
import { TextEditor } from '../../text-editor/TextEditor';
import { Descendant } from 'slate';
import { useLectureContext } from '../../../hooks/useLectureContext';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';
import { SaveAndCancelButton } from '../SaveAndCancelButton';

const placeholder =
  'Add a description. Include what students will be able to do after completing the lecture.';

interface DescriptionEditorProps {
  closeEditor: () => void;
}

export const DesctiptionEditor = ({ closeEditor }: DescriptionEditorProps) => {
  const { lecture } = useLectureContext();
  const { courseDraftId, curriculumSection } = useCurriculumSectionContext();

  const key = `${courseDraftId}_${curriculumSection.id}_${lecture.id}`;

  const saveToLocalStorage = (value: Descendant[]) => {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  };

  const getFromLocalStorageOrDefault = (): Descendant[] => {
    const stringValue = localStorage.getItem(key);

    if (!stringValue) {
      return [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ];
    }

    return JSON.parse(stringValue);
  };

  const onChange = (value: Descendant[]) => {
    saveToLocalStorage(value);
  };

  const initialValue = getFromLocalStorageOrDefault();

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
