import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const SignUpButton = () => {
  const onClickSignUp = () => {};

  return (
    <Link to="/signup">
      <Button variant="contained" color="primary" onClick={onClickSignUp}>
        Sign up
      </Button>
    </Link>
  );
};
