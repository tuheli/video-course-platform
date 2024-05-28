import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { step2Updated } from '../../../../features/courseCreationSlice';
import { InputFieldWithMaxCharacters } from '../InputFieldWithMaxCharacters';

export const Step2Item = () => {
  const { title } = useAppSelector((state) => state.courseCreation.steps.step2);
  const dispatch = useAppDispatch();

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    dispatch(step2Updated(inputValue));
  };

  return (
    <Box>
      <InputFieldWithMaxCharacters
        value={title}
        placeholder="e.g. Learn Photoshop CS6 from Scratch"
        maxInputLength={60}
        onChange={onChangeText}
      />
    </Box>
  );
};
