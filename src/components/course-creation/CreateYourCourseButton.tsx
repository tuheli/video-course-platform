import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const CreateYourCourseButton = () => {
  return (
    <Link to="create">
      <Button
        variant="contained"
        color="secondary"
        sx={{
          width: 260,
        }}
      >
        Create Your Course
      </Button>
    </Link>
  );
};
