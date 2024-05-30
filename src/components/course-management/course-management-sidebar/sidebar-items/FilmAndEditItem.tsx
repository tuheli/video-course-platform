import { useParams } from 'react-router-dom';
import { SidebarItem } from '../SidebarItem';
import { basePath } from '../CourseManagementSideBar';

export const FilmAndEditItem = () => {
  const { courseId } = useParams();

  const pathSuffix = 'manage/film';

  const linkTo = `${basePath}/${courseId}/${pathSuffix}`;

  return (
    <>
      {courseId && (
        <SidebarItem
          text="Film & Edit"
          locationEndsWith={linkTo}
          isReadyForSubmission={false}
          linkTo={linkTo}
        />
      )}
    </>
  );
};
