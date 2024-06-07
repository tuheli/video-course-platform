import { useState } from 'react';
import { ItemWithOrderIndex, getSortedCopy } from '../drag-and-drop/utils';
import { useAppDispatch } from '../../app/hooks';
import { reorderedSections } from '../../features/courseDraftsSlice';
import { useCurriculumFromParams } from '../../hooks/useCurriculum';
import { Stack } from '@mui/material';
import { DragAndDropContext } from './DragAndDropContext';
import { Dropzone } from './Dropzone';
import { Draggable } from './Draggable';
import { AddSectionButton } from '../curriculum/section/AddSectionButton';
import { SectionV2 } from './SectionV2';

interface CurriculumProps {
  forcedCourseId?: string;
}

export const CurriculumV2 = ({ forcedCourseId }: CurriculumProps) => {
  const [currentlyDraggedItemId, setCurrentlyDraggedItemId] = useState<
    string | null
  >(null);
  const { curriculum, courseDraft } = useCurriculumFromParams(forcedCourseId);
  const dispatch = useAppDispatch();

  const changeOrder = (newOrder: ItemWithOrderIndex[]) => {
    if (!courseDraft) return;
    dispatch(reorderedSections({ courseDraftId: courseDraft.id, newOrder }));
  };

  if (!courseDraft) return null;

  const sortedCurriculum = getSortedCopy(curriculum);

  return (
    <>
      <DragAndDropContext.Provider
        value={{
          currentlyDraggedItemId,
          setCurrentlyDraggedItemId,
        }}
      >
        <Dropzone allowedDropzoneTag="section">
          <Stack
            sx={{
              gap: 4,
            }}
          >
            {sortedCurriculum.map((curriculumSection, index) => (
              <Draggable
                key={curriculumSection.id}
                dataId={curriculumSection.id}
                allowedDropzoneTag="section"
                changeOrder={changeOrder}
              >
                <SectionV2
                  curriculumSection={curriculumSection}
                  courseDraftId={courseDraft.id}
                  index={index}
                />
              </Draggable>
            ))}
          </Stack>
        </Dropzone>
      </DragAndDropContext.Provider>
      <AddSectionButton courseDraftId={courseDraft.id} />
    </>
  );
};
