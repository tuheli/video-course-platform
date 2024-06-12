import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ExitButton = () => {
  const navigate = useNavigate();

  const onClickExit = () => {
    navigate('/instructor');
  };

  return (
    <Button
      variant="text"
      onClick={onClickExit}
      sx={{
        color: 'secondary.light',
        fontWeight: 600,
        fontSize: 16,
      }}
    >
      Exit
    </Button>
  );
};
