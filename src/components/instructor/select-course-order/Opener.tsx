import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDropdownContext } from '../../../hooks/useDropdownContext';
import { useAppSelector } from '../../../app/hooks';

export const Opener = () => {
  const { isDropdownOpen } = useDropdownContext();
  const currentOrderingOption = useAppSelector(
    (state) => state.userPreferences.myCoursesOrdering
  );

  return (
    <Button
      variant="outlined"
      color="primary"
      sx={{
        height: 54,
        color: 'text.primary',
        fontSize: 16,
        transition: 'none',
      }}
    >
      {currentOrderingOption}
      <ExpandMoreIcon
        sx={{
          ml: 1,
          fontSize: 22,
          transform: isDropdownOpen ? 'scale(1,-1)' : 'initial',
          transition: isDropdownOpen ? '0.2s all ease-in-out' : '0s all',
        }}
      />
    </Button>
  );
};
