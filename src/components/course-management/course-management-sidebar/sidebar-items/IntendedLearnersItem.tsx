import { useParams } from 'react-router-dom';
import { SidebarItem, SubmissionCheckItemProps } from '../SidebarItem';
import { basePath } from '../CourseManagementSideBar';

export const IntendedLearnersItem = ({
  isReadyForSubmission,
}: SubmissionCheckItemProps) => {
  const { courseId } = useParams();

  const pathSuffix = 'manage/goals';

  const linkTo = `${basePath}/${courseId}/${pathSuffix}`;

  return (
    <>
      {courseId && (
        <SidebarItem
          text="Intended learners"
          locationEndsWith={linkTo}
          isReadyForSubmission={isReadyForSubmission}
          linkTo={linkTo}
        />
      )}
    </>
  );
};
