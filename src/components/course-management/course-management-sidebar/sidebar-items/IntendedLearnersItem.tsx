import { useParams } from 'react-router-dom';
import { SidebarItem } from '../SidebarItem';
import { basePath } from '../CourseManagementSideBar';

export const IntendedLearnersItem = () => {
  const { courseId } = useParams();

  const pathSuffix = 'manage/goals';

  const linkTo = `${basePath}/${courseId}/${pathSuffix}`;

  return (
    <>
      {courseId && (
        <SidebarItem
          text="Intended learners"
          locationEndsWith={linkTo}
          isReadyForSubmission={false}
          linkTo={linkTo}
        />
      )}
    </>
  );
};
