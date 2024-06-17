import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useGetCourseDraftsQuery } from '../../features/apiSlice';
import { fetchedCourseDrafts } from '../../features/courseDraftsSlice';

// NOTE: The course drafts are customized
// locally and saved in the Redux store.
// This component is a utility component
// to initialize the local state.
// I thought it could be good to update
// the state locally and then send it
// to the server on demand.
// Also this approach helps to avoid
// mixing the application and server logic.

export const FetchCourseDrafts = () => {
  const { data } = useGetCourseDraftsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) return;
    dispatch(fetchedCourseDrafts(data));
  }, [data, dispatch]);

  return null;
};
