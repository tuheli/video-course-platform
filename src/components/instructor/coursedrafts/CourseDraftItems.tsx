import { useAppSelector } from '../../../app/hooks';
import { CourseDraftItem } from './CourseDraftItem';

export const CourseDraftItems = () => {
  const myEmail = useAppSelector((state) => state.me.user?.credentials.email);
  const courseDrafts = useAppSelector((state) => state.courseDrafts);

  const myCourseDrafts = courseDrafts.filter(
    ({ creatorEmail }) => creatorEmail === myEmail
  );

  return (
    <>
      {myCourseDrafts.map((courseDraft) => (
        <CourseDraftItem key={courseDraft.id} courseDraft={courseDraft} />
      ))}
    </>
  );
};
