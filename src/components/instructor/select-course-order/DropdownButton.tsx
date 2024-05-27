import { Button } from '@mui/material';
import { useDropdownContext } from '../../../hooks/useDropdownContext';
import { useAppDispatch } from '../../../app/hooks';
import {
  OrderingOptionType,
  changedMyCoursesOrdering,
} from '../../../features/userPreferencesSlice';

interface DropdownButtonProps {
  orderingOption: OrderingOptionType;
}

export const DropdownButton = ({ orderingOption }: DropdownButtonProps) => {
  const { closeMainDropdown } = useDropdownContext();
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(changedMyCoursesOrdering(orderingOption));
    closeMainDropdown();
  };

  return (
    <Button
      onClick={onClick}
      sx={{
        justifyContent: 'left',
      }}
    >
      {orderingOption}
    </Button>
  );
};
