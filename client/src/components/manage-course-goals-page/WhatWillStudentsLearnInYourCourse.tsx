import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from './LightColoredRouterLink';
import { DragAndDropContext } from '../../contexts/DragAndDropContext';
import { useChangeOrder } from '../../hooks/useChangeOrder';
import { EditableTextItem } from './EditableTextItem';
import { isAbleToDeleteLearningObjective } from '../../features/courseDraftsSlice';
import { AddItemButton } from './AddItemButton';
import { Dropzone } from '../drag-and-drop-v2/Dropzone';
import { ItemWithOrderIndex, getSortedCopy } from '../drag-and-drop-v2/utils';
import { MemoDraggable } from '../drag-and-drop-v2/Draggable';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const examplePlaceholderText =
  'Example: Define the roles and responsibilities of a project manager';

export const WhatWillStudentsLearnInYourCourse = () => {
  const state = useAppSelector((state) => state.courseDrafts);
  const { courseId } = useParams();
  const { changeOrder } = useChangeOrder('learningObjectives');

  const courseIdAsNumber = Number(courseId);
  const courseDraft =
    courseId === undefined
      ? undefined
      : state?.find((courseDraft) => courseDraft.id === courseIdAsNumber);

  const changeLearningObjectivesOrder = (newOrder: ItemWithOrderIndex[]) => {
    if (!courseDraft) return;
    changeOrder(newOrder, courseDraft);
  };

  const sortedLearningObjectives =
    courseDraft === undefined
      ? []
      : getSortedCopy(courseDraft.courseContent.learningObjectives.items);

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
          itemsState: sortedLearningObjectives,
          changeOrder: changeLearningObjectivesOrder,
        }}
      >
        <Dropzone allowedDropzoneTag="learning-objective">
          <Stack
            sx={{
              gap: 2,
            }}
          >
            {sortedLearningObjectives.map((learningObjective) => {
              return (
                <MemoDraggable
                  key={learningObjective.id}
                  dataId={learningObjective.id}
                  allowedDropzoneTag="learning-objective"
                  changeOrder={changeLearningObjectivesOrder}
                >
                  <EditableTextItem
                    examplePlaceholderText={examplePlaceholderText}
                    type={'learningObjectives'}
                    item={learningObjective}
                    courseDraft={courseDraft}
                    isAbleToDeleteItem={isAbleToDeleteLearningObjective}
                  />
                </MemoDraggable>
              );
            })}
          </Stack>
        </Dropzone>
      </DragAndDropContext.Provider>
      <AddItemButton
        courseDraftId={courseDraft.id}
        type="learningObjectives"
        orderIndex={
          sortedLearningObjectives.length > 0
            ? Math.max(...sortedLearningObjectives.map((p) => p.orderIndex)) + 1
            : 0
        }
      />
    </Stack>
  );
};
