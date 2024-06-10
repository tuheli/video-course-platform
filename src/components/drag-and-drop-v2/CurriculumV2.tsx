import { useCallback } from 'react';
import { ItemWithOrderIndex, getSortedCopy } from '../drag-and-drop/utils';
import { useAppDispatch } from '../../app/hooks';
import { reorderedSections } from '../../features/courseDraftsSlice';
import { useCurriculumFromParams } from '../../hooks/useCurriculum';
import { Stack } from '@mui/material';
import { Dropzone } from './Dropzone';
import { AddSectionButton } from '../curriculum/section/AddSectionButton';
import DraggableSection from './DraggableSection';

interface CurriculumProps {
  forcedCourseId?: string;
}

export const CurriculumV2 = ({ forcedCourseId }: CurriculumProps) => {
  const { curriculum, courseDraft, courseDraftId } =
    useCurriculumFromParams(forcedCourseId);

  const dispatch = useCallback(useAppDispatch(), []);

  const changeOrder = useCallback((newOrder: ItemWithOrderIndex[]) => {
    if (!courseDraftId) return;
    dispatch(reorderedSections({ courseDraftId, newOrder }));
  }, []);

  if (!courseDraft) return null;

  const sortedCurriculum = getSortedCopy(curriculum);

  return (
    <>
      <Dropzone allowedDropzoneTag="section">
        <Stack
          sx={{
            gap: 4,
          }}
        >
          {sortedCurriculum.map((curriculumSection, index) => (
            <DraggableSection
              key={curriculumSection.id}
              dataId={curriculumSection.id}
              allowedDropzoneTag="section"
              changeOrder={changeOrder}
              curriculumSection={curriculumSection}
              courseDraftId={courseDraft.id}
              index={index}
            />
          ))}
        </Stack>
      </Dropzone>
      <AddSectionButton courseDraftId={courseDraft.id} />
    </>
  );
};
