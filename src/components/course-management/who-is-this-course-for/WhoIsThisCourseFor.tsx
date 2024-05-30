import { Stack, Typography } from '@mui/material';
import { LightColoredRouterLink } from '../LightColoredRouterLink';
import { EditIntendedLearnersItem } from './EditIntendedLearnersItem';
import { AddIntendedLearnersButton } from './AddIntendedLearnersButton';
import { useCourseDraft } from '../../../hooks/useCourseDraft';
import { useOrderedItems } from '../../../hooks/useOrderedItems';
import { useChangeOrder } from '../../../hooks/useChangeOrder';
import { ItemWithOrderIndex } from '../../drag-and-drop/utils';
import { DragAndDropContext } from '../../../contexts/DragAndDropContext';
import { DroppableArea } from '../../drag-and-drop/DroppableArea';
import { Draggable } from '../../drag-and-drop/Draggable';

export const WhoIsThisCourseFor = () => {
  const courseDraft = useCourseDraft();
  const intendedLearners = useOrderedItems('intendedLearners');
  const { changeOrder } = useChangeOrder('intendedLearners');

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
        <DroppableArea>
          <Stack
            sx={{
              gap: 2,
            }}
          >
            {intendedLearners.map((intendedLearner) => (
              <Draggable id={intendedLearner.id} key={intendedLearner.id}>
                <EditIntendedLearnersItem
                  courseDraft={courseDraft}
                  intendedLearner={intendedLearner}
                />
              </Draggable>
            ))}
          </Stack>
        </DroppableArea>
      </DragAndDropContext.Provider>
      <AddIntendedLearnersButton />
    </Stack>
  );
};
