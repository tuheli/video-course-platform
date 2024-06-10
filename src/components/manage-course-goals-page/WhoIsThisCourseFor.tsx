import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from './LightColoredRouterLink';
import { useCourseDraft } from '../../hooks/useCourseDraft';
import { useOrderedCourseContent } from '../../hooks/useOrderedCourseContent';
import { useChangeOrder } from '../../hooks/useChangeOrder';
import { DragAndDropContext } from '../../contexts/DragAndDropContext';
import { EditableTextItem } from './EditableTextItem';
import { isAbleToDeleteIntendedLearners } from '../../features/courseDraftsSlice';
import { AddItemButton } from './AddItemButton';
import { Dropzone } from '../drag-and-drop-v2/Dropzone';
import { ItemWithOrderIndex } from '../drag-and-drop-v2/utils';
import { MemoDraggable } from '../drag-and-drop-v2/Draggable';

export const WhoIsThisCourseFor = () => {
  const courseDraft = useCourseDraft();
  const intendedLearners = useOrderedCourseContent('intendedLearners');
  const { changeOrder } = useChangeOrder('intendedLearners');

  const examplePlaceholderText =
    'Example: Beginner Python developers curious about data science';

  const changeIntendedLearnersOrder = (newOrder: ItemWithOrderIndex[]) => {
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
          itemsState: intendedLearners,
          changeOrder: changeIntendedLearnersOrder,
        }}
      >
        <Dropzone allowedDropzoneTag="intended-learners">
          <Stack
            sx={{
              gap: 2,
            }}
          >
            {intendedLearners.map((intendedLearnersItem) => {
              return (
                <MemoDraggable
                  key={intendedLearnersItem.id}
                  dataId={intendedLearnersItem.id}
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
      <AddItemButton courseDraftId={courseDraft.id} type="intendedLearners" />
    </Stack>
  );
};
