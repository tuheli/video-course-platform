import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useGetCourseDraftsQuery } from '../../features/apiSlice';
import { fetchedCourseDrafts } from '../../features/courseDraftsSlice';

// NOTE: The course drafts are customized
// locally and saved in the Redux store.
// I thought it could be good to update
// the state locally and then send it
// to the server on demand.

export const FetchCourseDrafts = () => {
  const { data } = useGetCourseDraftsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) return;
    dispatch(fetchedCourseDrafts(data));
  }, [data, dispatch]);

  return null;
};
