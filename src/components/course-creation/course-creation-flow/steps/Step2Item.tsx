import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { step2Updated } from '../../../../features/courseCreationSlice';
import { StyledInput } from '../../../sign-up/StyledTextInput';

const maxInputLength = 60;

export const Step2Item = () => {
  const { title } = useAppSelector((state) => state.courseCreation.steps.step2);
  const dispatch = useAppDispatch();

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    dispatch(step2Updated(inputValue));
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          border: '1px solid',
          borderColor: 'text.secondary',
          width: 660,
          height: 54,
          pl: 2,
          pr: 8,
          mt: 4,
        }}
      >
        <StyledInput
          onChange={onChangeText}
          value={title}
          placeholder="e.g. Learn Photoshop CS6 from Scratch"
          maxLength={maxInputLength}
          sx={{
            fontSize: 16,
            color: 'text.primary',
          }}
        />
        <Box>
          <Typography
            sx={{
              position: 'absolute',
              top: '50%',
              right: 10,
              transform: 'translate(0, -50%)',
              pointerEvents: 'none',
            }}
          >
            {maxInputLength - title.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
