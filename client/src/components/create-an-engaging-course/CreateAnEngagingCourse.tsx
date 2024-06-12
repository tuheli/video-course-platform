import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Section } from './Section';
import { getEngagingCourseData } from '../../../data/createAnEngagingCourseData';

export const CreateAnEngagingCourse = () => {
  const sectionsData = getEngagingCourseData();

  return (
    <Container>
      <Grid2 container spacing={2}>
        {sectionsData.map((section, index) => {
          const isWide = index === 0 || index === sectionsData.length - 1;

          return (
            <Grid2 key={index} xs={isWide ? 12 : 6}>
              <Section section={section} isWide={isWide} />
            </Grid2>
          );
        })}
      </Grid2>
    </Container>
  );
};
