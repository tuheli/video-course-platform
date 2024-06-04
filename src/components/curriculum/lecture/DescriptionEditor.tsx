import { Stack, Typography } from '@mui/material';
import { TextEditor } from '../../text-editor/TextEditor';
import { Descendant } from 'slate';
import { useLectureContext } from '../../../hooks/useLectureContext';
import { useCurriculumSectionContext } from '../../../hooks/useCurriculumSectionContext';
import { useAppDispatch } from '../../../app/hooks';
import { updatedLecture } from '../../../features/courseDraftsSlice';

const placeholder =
  'Add a description. Include what students will be able to do after completing the lecture.';

export const DesctiptionEditor = () => {
  const { lecture } = useLectureContext();
  const { courseDraftId, curriculumSection } = useCurriculumSectionContext();
  const dispatch = useAppDispatch();

  const onChange = (value: Descendant[]) => {
    dispatch(
      updatedLecture({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
        lectureId: lecture.id,
        newValue: JSON.stringify(value),
        propertyName: 'description',
      })
    );
  };

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
      <TextEditor placeholder={placeholder} onChange={onChange} />
    </Stack>
  );
};
