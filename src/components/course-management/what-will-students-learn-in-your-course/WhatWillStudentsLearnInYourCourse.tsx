import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../LightColoredRouterLink';
import { EditLearningObjectiveItem } from './EditLearningObjectiveItem';
import { AddLearningObjectiveButton } from './AddLearningObjectiveButton';
import { useCourseDraft } from '../../../hooks/useCourseDraft';
import { DroppableArea } from '../../drag-and-drop/DroppableArea';
import { Draggable, IDraggable } from '../../drag-and-drop/Draggable';
import { DragAndDropContext } from '../../../contexts/DragAndDropContext';
import { useEffect, useState } from 'react';
import { TextWithId } from '../../../features/courseDraftsSlice';

export const WhatWillStudentsLearnInYourCourse = () => {
  const [learningObjectives, setLearningObjectives] = useState<TextWithId[]>(
    []
  );

  const courseDraft = useCourseDraft();

  useEffect(() => {
    const learningObjectives =
      courseDraft?.courseContent.intendedLearnersSection.learningObjectives;

    if (!learningObjectives) return;

    setLearningObjectives(learningObjectives);
  }, []);

  const changeOrder = (draggables: IDraggable[]) => {
    const stateWithYPositions = learningObjectives.map((learningObjective) => {
      // Find inside map is slow in theory but the item counts are tiny
      const draggable = draggables.find(
        (draggable) => draggable.id === learningObjective.id
      );

      if (!draggable) {
        // This would essentially break the ordering
        // by setting the item on top but it would
        // be a bug to not have the draggable
        // found. Also checking if the id mapping exists
        // from draggables to learning objectives
        // would not help because if a mapping does not exist
        // reordering just could not be done correctly and
        // an early return would cause nothing to happen
        return {
          ...learningObjective,
          yPosition: 0,
        };
      }

      return {
        ...learningObjective,
        yPosition: draggable.yPosition,
      };
    });

    const stateReordered = stateWithYPositions.sort(
      (a, b) => a.yPosition - b.yPosition
    );

    const reorderedStateWithoutYPositions: TextWithId[] = stateReordered.map(
      ({ id, text }) => {
        return {
          id,
          text,
        };
      }
    );

    setLearningObjectives(reorderedStateWithoutYPositions);
  };

  const courseDraftId = courseDraft?.id;

  if (!courseDraftId || !learningObjectives) return null;

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
      <DragAndDropContext.Provider value={{ changeOrder }}>
        <DroppableArea>
          {learningObjectives.map((learningObjective) => (
            <Draggable id={learningObjective.id} key={learningObjective.id}>
              <EditLearningObjectiveItem
                courseDraft={courseDraft}
                learningObjective={learningObjective}
              />
            </Draggable>
          ))}
        </DroppableArea>
      </DragAndDropContext.Provider>
      <AddLearningObjectiveButton />
    </Stack>
  );
};
