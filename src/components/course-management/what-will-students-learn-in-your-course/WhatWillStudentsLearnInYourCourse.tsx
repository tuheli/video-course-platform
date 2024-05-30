import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../LightColoredRouterLink';
import { EditLearningObjectiveItem } from './EditLearningObjectiveItem';
import { AddLearningObjectiveButton } from './AddLearningObjectiveButton';
import { useCourseDraft } from '../../../hooks/useCourseDraft';
import { DroppableArea } from '../../drag-and-drop/DroppableArea';
import { Draggable } from '../../drag-and-drop/Draggable';
import { DragAndDropContext } from '../../../contexts/DragAndDropContext';
import { ItemWithOrderIndex } from '../../drag-and-drop/utils';
import { useOrderedItems } from '../../../hooks/useOrderedItems';
import { useChangeOrder } from '../../../hooks/useChangeOrder';

export const WhatWillStudentsLearnInYourCourse = () => {
  const courseDraft = useCourseDraft();
  const learningObjectives = useOrderedItems('learningObjectives');
  const { changeOrder } = useChangeOrder('learningObjectives');

  const changeLearningObjectivesOrder = (newOrder: ItemWithOrderIndex[]) => {
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
        What will students learn in your course?
      </Typography>
      <Typography>
        You must enter at least 4{' '}
        <LightColoredRouterLink to="/">
          learning objectives or outcomes
        </LightColoredRouterLink>{' '}
        that learners can expect to achieve after completing your course.
      </Typography>
      <DragAndDropContext.Provider
        value={{
          itemsState: learningObjectives,
          changeOrder: changeLearningObjectivesOrder,
        }}
      >
        <DroppableArea>
          <Stack
            sx={{
              gap: 2,
            }}
          >
            {learningObjectives.map((learningObjective) => (
              <Draggable id={learningObjective.id} key={learningObjective.id}>
                <EditLearningObjectiveItem
                  courseDraft={courseDraft}
                  learningObjective={learningObjective}
                />
              </Draggable>
            ))}
          </Stack>
        </DroppableArea>
      </DragAndDropContext.Provider>
      <AddLearningObjectiveButton />
    </Stack>
  );
};
