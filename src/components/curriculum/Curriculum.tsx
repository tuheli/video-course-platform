import { Stack } from '@mui/material';
import { Section } from './section/Section';
import { useCurriculumFromParams } from '../../hooks/useCurriculum';
import { AddSectionButton } from './section/AddSectionButton';
import { cleanupCurriculumLocalStorage } from './utils';
import { DroppableArea } from '../drag-and-drop/DroppableArea';
import { Draggable } from '../drag-and-drop/Draggable';
import { DragAndDropContext } from '../../contexts/DragAndDropContext';
import { ItemWithOrderIndex } from '../drag-and-drop/utils';
import { reorderedSections } from '../../features/courseDraftsSlice';
import { useAppDispatch } from '../../app/hooks';
import { useState } from 'react';

interface CurriculumProps {
  forcedCourseId?: string;
}

export const Curriculum = ({ forcedCourseId }: CurriculumProps) => {
  const { curriculum, courseDraft } = useCurriculumFromParams(forcedCourseId);
  const [isSomethingDragged, setIsSomethingDragged] = useState(false);
  const dispatch = useAppDispatch();

  if (!courseDraft) return null;

  cleanupCurriculumLocalStorage(courseDraft.id, curriculum);

  const changeSectionsOrder = (newOrder: ItemWithOrderIndex[]) => {
    if (!courseDraft) return;
    dispatch(reorderedSections({ courseDraftId: courseDraft.id, newOrder }));
  };

  return (
    <>
      <DragAndDropContext.Provider
        value={{
          itemsState: curriculum,
          isSomethingDragged,
          changeOrder: changeSectionsOrder,
          setIsSomethingDragged,
        }}
      >
        <DroppableArea>
          <Stack
            sx={{
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {curriculum.map((curriculumSection, index) => (
              <Draggable key={curriculumSection.id} id={curriculumSection.id}>
                <Section
                  curriculumSection={curriculumSection}
                  courseDraftId={courseDraft.id}
                  index={index}
                />
              </Draggable>
            ))}
          </Stack>
        </DroppableArea>
      </DragAndDropContext.Provider>
      <AddSectionButton courseDraftId={courseDraft.id} />
    </>
  );
};
