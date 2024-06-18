import { Stack, Typography } from '@mui/material';
import { DragAndDropContext } from '../../contexts/DragAndDropContext';
import { useChangeOrder } from '../../hooks/useChangeOrder';
import { EditableTextItem } from './EditableTextItem';
import { isAbleToDeletePrerequisite } from '../../features/courseDraftsSlice';
import { AddItemButton } from './AddItemButton';
import { Dropzone } from '../drag-and-drop-v2/Dropzone';
import {
  ItemWithOrderIndex,
  getSortedByOrderIndexCopy,
} from '../drag-and-drop-v2/utils';
import { MemoDraggable } from '../drag-and-drop-v2/Draggable';
import { useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';

const examplePlaceholderText =
  'Example: No programming experience needed. You will learn everything you need to know';

export const WhatAreTheCoursePrerequisites = () => {
  const state = useAppSelector((state) => state.courseDrafts);
  const { courseId } = useParams();
  const { changeOrder } = useChangeOrder('prerequisites');

  const courseIdAsNumber = Number(courseId);
  const courseDraft =
    courseId === undefined
      ? undefined
      : state?.find((courseDraft) => courseDraft.id === courseIdAsNumber);

  const changePrerequisitesOrder = (newOrder: ItemWithOrderIndex[]) => {
    if (!courseDraft) return;
    changeOrder(newOrder, courseDraft);
  };

  const sortedPrerequisites =
    courseDraft === undefined
      ? []
      : getSortedByOrderIndexCopy(
          courseDraft.courseContent.prerequisites.items
        );

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
          itemsState: sortedPrerequisites,
          changeOrder: changePrerequisitesOrder,
        }}
      >
        <Dropzone allowedDropzoneTag="course-prerequisite">
          <Stack
            sx={{
              gap: 2,
            }}
          >
            {sortedPrerequisites.map((prerequisite) => {
              return (
                <MemoDraggable
                  key={prerequisite.id}
                  dataId={`${prerequisite.id}`}
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
      <AddItemButton
        courseDraft={courseDraft}
        type="prerequisites"
        orderIndex={
          sortedPrerequisites.length > 0
            ? Math.max(...sortedPrerequisites.map((p) => p.orderIndex)) + 1
            : 0
        }
      />
    </Stack>
  );
};
