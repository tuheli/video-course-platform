import { useAppSelector } from '../../../app/hooks';
import { CourseDraftItem } from './CourseDraftItem';

export const CourseDraftItems = () => {
  const signedInUser = useAppSelector((state) => state.me.user);
  const courseDrafts = useAppSelector((state) => state.courseDrafts);

  const signedInUsersCourseDrafts = courseDrafts.filter(
    ({ creatorEmail }) => creatorEmail === signedInUser?.email
  );

  return (
    <>
      {signedInUsersCourseDrafts.map((courseDraft) => (
        <CourseDraftItem key={courseDraft.id} courseDraft={courseDraft} />
      ))}
    </>
  );
};
