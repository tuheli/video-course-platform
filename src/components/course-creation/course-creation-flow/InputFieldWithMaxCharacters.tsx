import { Box, SxProps, Typography } from '@mui/material';
import { StyledInput } from '../../sign-up/StyledTextInput';
import { ChangeEvent } from 'react';

interface InputFieldWithMaxCharactersProps {
  value: string;
  placeholder: string;
  maxInputLength?: number;
  sx?: SxProps;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFieldWithMaxCharacters = ({
  value,
  placeholder,
  maxInputLength,
  sx,
  onChange,
}: InputFieldWithMaxCharactersProps) => {
  const isMaxCharactersVisible = maxInputLength !== undefined;

  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid',
        borderColor: 'text.primary',
        width: 660,
        height: 54,
        pl: 2,
        pr: isMaxCharactersVisible ? 8 : 2,
        ...sx,
      }}
    >
      <StyledInput
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        maxLength={maxInputLength}
        sx={{
          fontSize: 16,
          textOverflow: 'ellipsis',
          color: 'text.primary',
          '&::placeholder': {
            color: 'text.secondary',
          },
          '&:focus::placeholder': {
            color: 'transparent',
          },
        }}
      />
      {isMaxCharactersVisible && (
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
            {maxInputLength - value.length}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
