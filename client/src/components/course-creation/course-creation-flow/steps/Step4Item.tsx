import { Box, Typography } from '@mui/material';
import {
  TimeAvailablePerWeek,
  step4Updated,
} from '../../../../features/courseCreationSlice';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

export interface Step4ItemProps {
  value: TimeAvailablePerWeek;
  text: string;
}

export const Step4Item = ({ value, text }: Step4ItemProps) => {
  const { timeAvailablePerWeek } = useAppSelector(
    (state) => state.courseCreation.steps.step4
  );
  const dispatch = useAppDispatch();

  const isChecked = value === timeAvailablePerWeek;

  const onClickBox = () => {
    dispatch(step4Updated(value));
  };

  return (
    <Box
      onClick={onClickBox}
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'text.primary',
        width: 660,
        height: 54,
        pl: 1,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'rgba(0, 0, 0, 0.13)',
        },
      }}
    >
      {isChecked && <RadioButtonCheckedIcon />}
      {!isChecked && <RadioButtonUncheckedIcon />}
      <Typography
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          ml: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
