import { useParams } from 'react-router-dom';
import { SidebarItem } from '../SidebarItem';
import { basePath } from '../CourseManagementSideBar';

export const CourseStrucureItem = () => {
  const { courseId } = useParams();

  const pathSuffix = 'manage/course-structure';

  const linkTo = `${basePath}/${courseId}/${pathSuffix}`;

  return (
    <>
      {courseId && (
        <SidebarItem
          text="Course structure"
          locationEndsWith={linkTo}
          isReadyForSubmission={false}
          linkTo={linkTo}
        />
      )}
    </>
  );
};
