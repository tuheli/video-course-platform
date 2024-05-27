import { Paper, Stack } from '@mui/material';
import { DropdownButton } from './DropdownButton';
import { OrderingOption } from '../../../features/userPreferencesSlice';

export const Dropdown = () => {
  const orderingOptions = Object.values(OrderingOption);

  return (
    <Paper>
      <Stack
        sx={{
          width: 200,
        }}
      >
        {orderingOptions.map((value) => (
          <DropdownButton key={value} orderingOption={value} />
        ))}
      </Stack>
    </Paper>
  );
};
