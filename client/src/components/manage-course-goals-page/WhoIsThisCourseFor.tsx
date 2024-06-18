import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from './LightColoredRouterLink';
import { useChangeOrder } from '../../hooks/useChangeOrder';
import { DragAndDropContext } from '../../contexts/DragAndDropContext';
import { EditableTextItem } from './EditableTextItem';
import { isAbleToDeleteIntendedLearners } from '../../features/courseDraftsSlice';
import { AddItemButton } from './AddItemButton';
import { Dropzone } from '../drag-and-drop-v2/Dropzone';
import {
  ItemWithOrderIndex,
  getSortedByOrderIndexCopy,
} from '../drag-and-drop-v2/utils';
import { MemoDraggable } from '../drag-and-drop-v2/Draggable';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const examplePlaceholderText =
  'Example: Beginner Python developers curious about data science';

export const WhoIsThisCourseFor = () => {
  const state = useAppSelector((state) => state.courseDrafts);
  const { courseId } = useParams();
  const { changeOrder } = useChangeOrder('intendedLearners');

  const courseIdAsNumber = Number(courseId);
  const courseDraft =
    courseId === undefined
      ? undefined
      : state?.find((courseDraft) => courseDraft.id === courseIdAsNumber);

  const changeIntendedLearnersOrder = (newOrder: ItemWithOrderIndex[]) => {
    if (!courseDraft) return;
    changeOrder(newOrder, courseDraft);
  };

  const sortedIntendedLearners =
    courseDraft === undefined
      ? []
      : getSortedByOrderIndexCopy(
          courseDraft.courseContent.intendedLearners.items
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
        Who is this course for?
      </Typography>
      <Typography>
        Write a clear description of the{' '}
        <LightColoredRouterLink to="/">
          intended learneres
        </LightColoredRouterLink>{' '}
        for your course who will find your course content valuable. This will
        help you attract the right learners to your course.
      </Typography>
      <DragAndDropContext.Provider
        value={{
          itemsState: sortedIntendedLearners,
          changeOrder: changeIntendedLearnersOrder,
        }}
      >
        <Dropzone allowedDropzoneTag="intended-learners">
          <Stack
            sx={{
              gap: 2,
            }}
          >
            {sortedIntendedLearners.map((intendedLearnersItem) => {
              return (
                <MemoDraggable
                  key={intendedLearnersItem.id}
                  dataId={`${intendedLearnersItem.id}`}
                  allowedDropzoneTag="intended-learners"
                  changeOrder={changeIntendedLearnersOrder}
                >
                  <EditableTextItem
                    examplePlaceholderText={examplePlaceholderText}
                    type={'intendedLearners'}
                    item={intendedLearnersItem}
                    courseDraft={courseDraft}
                    isAbleToDeleteItem={isAbleToDeleteIntendedLearners}
                  />
                </MemoDraggable>
              );
            })}
          </Stack>
        </Dropzone>
      </DragAndDropContext.Provider>
      <AddItemButton
        courseDraft={courseDraft}
        type="intendedLearners"
        orderIndex={
          sortedIntendedLearners.length > 0
            ? Math.max(...sortedIntendedLearners.map((p) => p.orderIndex)) + 1
            : 0
        }
      />
    </Stack>
  );
};
