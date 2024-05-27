import { Box, Stack } from '@mui/material';
import { StyledInput } from '../sign-up/StyledTextInput';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { itemFontSize, itemHeight } from './common';

export const SearchYourCourses = () => {
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClickSearchIcon = () => {
    setInputValue('');
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          border: '1px solid',
          borderColor: 'text.primary',
          width: 260,
          height: itemHeight,
          pl: 2,
          pr: 9,
        }}
      >
        <StyledInput
          onChange={onChangeInput}
          value={inputValue}
          placeholder="Search your courses"
          sx={{
            fontSize: itemFontSize,
            color: 'text.primary',
          }}
        />
      </Box>
      <Box
        onClick={onClickSearchIcon}
        component="button"
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translate(0, -50%)',
          bgcolor: 'text.primary',
          width: itemHeight,
          height: itemHeight,
          border: 'none',
          p: 0,
          m: 0,
          '&:hover': {
            cursor: 'pointer',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <SearchIcon
          sx={{
            color: 'text.contrast',
          }}
        />
      </Box>
    </Stack>
  );
};
