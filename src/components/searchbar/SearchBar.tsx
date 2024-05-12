import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, styled } from '@mui/material';
import { useState } from 'react';

const StyledInput = styled('input')(({ theme }) => ({
  border: 'none',
  outline: 'none',
  flexGrow: 1,
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
}));

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const isButtonEnabled = Boolean(searchValue);

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onClickSearchIcon = () => {
    if (!isButtonEnabled) return;
    setSearchValue('');
  };

  const onSubmitSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchValue('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: '1px solid #ccc',
        borderRadius: '999px',
        padding: ' 5px 10px',
        flexGrow: 1,
      }}
    >
      <IconButton
        size="small"
        onClick={onClickSearchIcon}
        sx={{
          cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
        }}
      >
        <SearchIcon
          sx={{
            color: 'text.secondary',
          }}
        />
      </IconButton>
      <form
        onSubmit={onSubmitSearchForm}
        style={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <StyledInput
          placeholder="Search for anything"
          value={searchValue}
          onChange={onChangeSearch}
        />
      </form>
    </Box>
  );
};
