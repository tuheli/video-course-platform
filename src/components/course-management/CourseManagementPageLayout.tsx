import { Box, Container, Divider, Paper, Stack } from '@mui/material';
import { CourseManagementSideBar } from './course-management-sidebar/CourseManagementSideBar';

interface CourseManagementPageLayoutProps {
  heading: React.ReactNode;
  children: React.ReactNode;
}

export const CourseManagementPageLayout = ({
  heading,
  children,
}: CourseManagementPageLayoutProps) => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <CourseManagementSideBar />
        <Paper
          sx={{
            width: '100%',
            p: 0,
          }}
        >
          <Stack
            sx={{
              flexDirection: 'column',
              width: '100%',
              gap: 4,
            }}
          >
            <Box
              sx={{
                px: 4,
                pt: 4,
              }}
            >
              {heading}
            </Box>
            <Divider />
            <Stack
              sx={{
                flexDirection: 'column',
                pl: 4,
                pr: 12,
                pb: 4,
                gap: 4,
              }}
            >
              {children}
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
