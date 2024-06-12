import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { itemFontSize, itemHeight } from './common';

export const NewCourseButton = () => {
  return (
    <Link to="/course/create">
      <Button
        variant="contained"
        color="secondary"
        sx={{
          height: itemHeight,
          fontSize: itemFontSize,
        }}
      >
        New course
      </Button>
    </Link>
  );
};
