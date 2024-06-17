import { useAppDispatch } from '../app/hooks';
import { store } from '../app/store';
import { ItemWithOrderIndex } from '../components/drag-and-drop-v2/utils';
import {
  CourseDraft,
  TextWithId,
  UpdateableCourseContentProperty,
  reorderedItems,
} from '../features/courseDraftsSlice';

export const useChangeOrder = (type: UpdateableCourseContentProperty) => {
  const dispatch = useAppDispatch();

  const changeOrder = (
    newOrder: ItemWithOrderIndex[],
    courseDraft: CourseDraft
  ) => {
    try {
      if (!courseDraft) return;

      const textArrayObjects = courseDraft.courseContent[type].items;

      const newState: TextWithId[] = newOrder.map((item) => {
        const matchingItem = textArrayObjects.find(
          (objective) => objective.id === item.id
        );

        // This would most likely mean the mapping is
        // broken in giveItemsOrderIndicies function
        // and we can't reorder the items here correctly
        if (!matchingItem) {
          throw new Error();
        }

        return {
          ...matchingItem,
          orderIndex: item.orderIndex,
        };
      });

      dispatch(
        reorderedItems({
          courseDraftId: courseDraft.id,
          newState,
          type,
        })
      );
    } catch (error) {
      return;
    }
  };

  const getOrderedItems = (courseDraftId: number) => {
    const allCourseDrafts = store.getState().courseDrafts;
    const courseDraft = allCourseDrafts.find(({ id }) => id === courseDraftId);

    if (!courseDraft) return [];

    return courseDraft.courseContent[type].items;
  };

  return {
    changeOrder,
    getOrderedItems,
  };
};
