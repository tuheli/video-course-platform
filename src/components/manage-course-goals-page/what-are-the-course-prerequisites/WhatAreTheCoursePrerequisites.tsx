import { Stack, Typography } from '@mui/material';
import { EditPrerequisitesItem } from './EditPrerequisitesItem';
import { AddPrerequisiteButton } from './AddPrerequisiteButton';
import { useCourseDraft } from '../../../hooks/useCourseDraft';
import { DragAndDropContext } from '../../../contexts/DragAndDropContext';
import { DroppableArea } from '../../drag-and-drop/DroppableArea';
import { Draggable } from '../../drag-and-drop/Draggable';
import { ItemWithOrderIndex } from '../../drag-and-drop/utils';
import { useChangeOrder } from '../../../hooks/useChangeOrder';
import { useOrderedItems } from '../../../hooks/useOrderedItems';

export const WhatAreTheCoursePrerequisites = () => {
  const courseDraft = useCourseDraft();
  const prerequisites = useOrderedItems('prerequisites');
  const { changeOrder } = useChangeOrder('prerequisites');

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
      {/* {prerequisites.map((prerequisite) => (
        <EditPrerequisitesItem
          key={prerequisite.id}
          prerequisite={prerequisite}
          courseDraft={courseDraft}
        />
      ))} */}
      <DragAndDropContext.Provider
        value={{
          itemsState: prerequisites,
          changeOrder: changePrerequisitesOrder,
        }}
      >
        <DroppableArea>
          <Stack
            sx={{
              gap: 2,
            }}
          >
            {prerequisites.map((prerequisite) => (
              <Draggable id={prerequisite.id} key={prerequisite.id}>
                <EditPrerequisitesItem
                  courseDraft={courseDraft}
                  prerequisite={prerequisite}
                />
              </Draggable>
            ))}
          </Stack>
        </DroppableArea>
      </DragAndDropContext.Provider>
      <AddPrerequisiteButton />
    </Stack>
  );
};
