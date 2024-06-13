import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LoginButton = () => {
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate('/login');
  };

  return (
    <Button variant="outlined" onClick={onClickLogin}>
      Log in
    </Button>
  );
};
