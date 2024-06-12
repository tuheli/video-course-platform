import { useCallback } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { reorderedSections } from '../../features/courseDraftsSlice';
import { useCurriculumFromParams } from '../../hooks/useCurriculum';
import { Stack } from '@mui/material';
import { AddSectionButton } from './section/AddSectionButton';
import { ItemWithOrderIndex } from '../drag-and-drop-v2/utils';
import { Dropzone } from '../drag-and-drop-v2/Dropzone';
import { MemoDraggableSection } from './section/DraggableSection';

interface CurriculumProps {
  forcedCourseId?: string;
}

export const Curriculum = ({ forcedCourseId }: CurriculumProps) => {
  const { curriculum, courseDraft, courseDraftId } =
    useCurriculumFromParams(forcedCourseId);

  const dispatch = useCallback(useAppDispatch(), []);

  const changeOrder = useCallback(
    (newOrder: ItemWithOrderIndex[]) => {
      if (!courseDraftId) return;
      dispatch(reorderedSections({ courseDraftId, newOrder }));
    },
    [courseDraftId, dispatch]
  );

  if (!courseDraft) return null;

  return (
    <>
      <Dropzone allowedDropzoneTag="section">
        <Stack
          sx={{
            gap: 4,
          }}
        >
          {curriculum.map((curriculumSection, index) => (
            <MemoDraggableSection
              key={curriculumSection.id}
              allowedDropzoneTag="section"
              changeOrder={changeOrder}
              courseDraftId={courseDraft.id}
              curriculumSection={curriculumSection}
              dataId={curriculumSection.id}
              index={index}
            />
          ))}
        </Stack>
      </Dropzone>
      <AddSectionButton courseDraftId={courseDraft.id} />
    </>
  );
};
