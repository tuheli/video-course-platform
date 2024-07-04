import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { reorderedSections } from '../../features/courseDraftsSlice';
import { Stack } from '@mui/material';
import { AddSectionButton } from './section/AddSectionButton';
import { ItemWithOrderIndex } from '../drag-and-drop-v2/utils';
import { Dropzone } from '../drag-and-drop-v2/Dropzone';
import { MemoDraggableSection } from './section/DraggableSection';
import { useParams } from 'react-router-dom';

export const Curriculum = () => {
  const courseDrafts = useAppSelector((state) => state.courseDrafts);
  const { courseId } = useParams();
  const dispatch = useCallback(useAppDispatch(), []);

  const courseIdAsNumber = Number(courseId);
  const courseDraft = !isNaN(courseIdAsNumber)
    ? courseDrafts.find(({ id }) => id === courseIdAsNumber)
    : null;

  const changeOrder = useCallback(
    (newOrder: ItemWithOrderIndex[]) => {
      if (!courseDraft) return;
      dispatch(reorderedSections({ courseDraftId: courseDraft.id, newOrder }));
    },
    [courseDraft, dispatch]
  );

  const curriculum = !courseDraft
    ? []
    : [...courseDraft.courseContent.curriculum].sort(
        (a, b) => a.orderIndex - b.orderIndex
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
              dataId={`${curriculumSection.id}`}
              index={index}
            />
          ))}
        </Stack>
      </Dropzone>
      <AddSectionButton courseDraftId={courseDraft.id} />
    </>
  );
};
