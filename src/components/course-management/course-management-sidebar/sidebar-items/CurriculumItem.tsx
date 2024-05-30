import { useParams } from 'react-router-dom';
import { SidebarItem } from '../SidebarItem';
import { basePath } from '../CourseManagementSideBar';

export const CurriculumItem = () => {
  const { courseId } = useParams();

  const pathSuffix = 'manage/curriculum';

  const linkTo = `${basePath}/${courseId}/${pathSuffix}`;

  return (
    <>
      {courseId && (
        <SidebarItem
          text="Curriculum"
          locationEndsWith={linkTo}
          isReadyForSubmission={false}
          linkTo={linkTo}
        />
      )}
    </>
  );
};
