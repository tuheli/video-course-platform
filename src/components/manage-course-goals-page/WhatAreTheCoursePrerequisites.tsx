import { Stack, Typography } from '@mui/material';
import { useCourseDraft } from '../../hooks/useCourseDraft';
import { DragAndDropContext } from '../../contexts/DragAndDropContext';
import { useChangeOrder } from '../../hooks/useChangeOrder';
import { useOrderedCourseContent } from '../../hooks/useOrderedCourseContent';
import { EditableTextItem } from './EditableTextItem';
import { isAbleToDeletePrerequisite } from '../../features/courseDraftsSlice';
import { AddItemButton } from './AddItemButton';
import { Dropzone } from '../drag-and-drop-v2/Dropzone';
import { ItemWithOrderIndex } from '../drag-and-drop-v2/utils';
import { MemoDraggable } from '../drag-and-drop-v2/Draggable';

export const WhatAreTheCoursePrerequisites = () => {
  const courseDraft = useCourseDraft();
  const prerequisites = useOrderedCourseContent('prerequisites');
  const { changeOrder } = useChangeOrder('prerequisites');

  const examplePlaceholderText =
    'Example: No programming experience needed. You will learn everything you need to know';

  const changePrerequisitesOrder = (newOrder: ItemWithOrderIndex[]) => {
    if (!courseDraft) return;
    changeOrder(newOrder, courseDraft);
  };

  if (!courseDraft) return null;

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
        }}
      >
        What are the requirements or prerequisites for taking your course?
      </Typography>
      <Typography>
        List the required skills, experience, tools or equipment learners should
        have prior to taking your course. If there are no requirements, use this
        space as an opportunity to lower the barrier for beginners.
      </Typography>
      <DragAndDropContext.Provider
        value={{
          itemsState: prerequisites,
          changeOrder: changePrerequisitesOrder,
        }}
      >
        <Dropzone allowedDropzoneTag="course-prerequisite">
          <Stack
            sx={{
              gap: 2,
            }}
          >
            {prerequisites.map((prerequisite) => {
              return (
                <MemoDraggable
                  key={prerequisite.id}
                  dataId={prerequisite.id}
                  allowedDropzoneTag="course-prerequisite"
                  changeOrder={changePrerequisitesOrder}
                >
                  <EditableTextItem
                    examplePlaceholderText={examplePlaceholderText}
                    type={'prerequisites'}
                    item={prerequisite}
                    courseDraft={courseDraft}
                    isAbleToDeleteItem={isAbleToDeletePrerequisite}
                  />
                </MemoDraggable>
              );
            })}
          </Stack>
        </Dropzone>
      </DragAndDropContext.Provider>
      <AddItemButton courseDraftId={courseDraft.id} type="prerequisites" />
    </Stack>
  );
};
