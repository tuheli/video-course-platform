import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../LightColoredRouterLink';
import { EditLearningObjectiveItem } from './EditLearningObjectiveItem';
import { AddLearningObjectiveButton } from './AddLearningObjectiveButton';
import { useCourseDraft } from '../../../hooks/useCourseDraft';
import { DroppableArea } from '../../drag-and-drop/DroppableArea';
import { Draggable } from '../../drag-and-drop/Draggable';
import { DragAndDropContext } from '../../../contexts/DragAndDropContext';
import {
  TextWithId,
  reorderedItems,
} from '../../../features/courseDraftsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { ItemWithOrderIndex } from '../../drag-and-drop/utils';

export const WhatWillStudentsLearnInYourCourse = () => {
  const courseDraft = useCourseDraft();
  const dispatch = useAppDispatch();

  const changeOrder = (newOrder: ItemWithOrderIndex[]) => {
    try {
      if (!courseDraft) return;

      const learningObjectives =
        courseDraft.courseContent.learningObjectives.items;

      const newState: TextWithId[] = newOrder.map((item) => {
        const learningObjective = learningObjectives.find(
          (objective) => objective.id === item.id
        );

        // This would most likely mean the mapping is
        // broken in giveItemsOrderIndicies function
        // and we can't reorder the items here correctly
        if (!learningObjective) {
          throw new Error();
        }

        return {
          ...learningObjective,
          orderIndex: item.orderIndex,
        };
      });

      dispatch(
        reorderedItems({
          courseDraftId: courseDraft.id,
          newState,
          type: 'learningObjectives',
        })
      );
    } catch (error) {
      return;
    }
  };

  if (!courseDraft) return null;

  // Sort the learning objectives by their order index
  const learningObjectivesCopy = [
    ...courseDraft.courseContent.learningObjectives.items,
  ];

  const learningObjectives = learningObjectivesCopy.sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

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
          changeOrder,
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
