import { styled } from '@mui/material';
import { getCategories } from '../../../../../data/courseData';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ChangeEvent } from 'react';
import {
  isValidCategory,
  step3Updated,
} from '../../../../features/courseCreationSlice';

export const Step3Item = () => {
  const { category } = useAppSelector(
    (state) => state.courseCreation.steps.step3
  );
  const dispatch = useAppDispatch();

  const categories = getCategories();

  const onCategoryChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;

    if (!isValidCategory(selectedCategory)) {
      return;
    }

    dispatch(step3Updated(selectedCategory));
  };

  const selectedCategoryOrEmpty = category === null ? '' : category;

  return (
    <StyledSelect
      onChange={onCategoryChanged}
      title=""
      name="categories"
      required
      defaultValue={selectedCategoryOrEmpty}
      sx={{
        border: '1px solid',
        borderColor: 'text.primary',
      }}
    >
      <option value="" disabled hidden>
        Choose a category
      </option>
      {categories.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled('select')(() => ({
  position: 'relative',
  border: 'none',
  outline: 'none',
  width: 660,
  height: 54,
  paddingLeft: 16,
  paddingRight: 16,
  fontSize: 16,
  WebkitAppearance: 'none',
  appearance: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}));
