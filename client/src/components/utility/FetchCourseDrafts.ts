import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useGetCourseDraftsQuery } from '../../features/apiSlice';
import { fetchedCourseDrafts } from '../../features/courseDraftsSlice';
import {
  getLectureDescriptionLocalStorageKey,
  saveToLocalStorage,
} from '../text-editor/utils';

// NOTE: The course drafts are customized
// locally and saved in the Redux store.
// This component is a utility component
// to initialize the local state.
// I thought it could be good to update
// the state locally and then send it
// to the server on demand.
// Also this approach helps to avoid
// mixing the application and server logic.

// NOTE: Maybe use custom hook instead of
// jsx component?

export const FetchCourseDrafts = () => {
  const { data } = useGetCourseDraftsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) return;
    dispatch(fetchedCourseDrafts(data));

    // Lesson description editor uses localstorage
    // so we initialize the state into localstorage
    // for the descriptions
    data.forEach((courseDraft) => {
      const curriculum = courseDraft.courseContent.curriculum;
      curriculum.forEach((section) => {
        const lessons = section.lessons;
        lessons.forEach((lesson) => {
          const localStorageKey = getLectureDescriptionLocalStorageKey(
            courseDraft.id,
            section.id,
            lesson.id
          );
          // description is now coming as json object
          // so no parsing here
          saveToLocalStorage(localStorageKey, lesson.description);
        });
      });
    });
  }, [data, dispatch]);

  return null;
};
