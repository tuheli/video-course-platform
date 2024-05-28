import { Box, Typography } from '@mui/material';
import { StyledInput } from '../../sign-up/StyledTextInput';
import { ChangeEvent } from 'react';

interface InputFieldWithMaxCharactersProps {
  value: string;
  placeholder: string;
  maxInputLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFieldWithMaxCharacters = ({
  value,
  placeholder,
  maxInputLength,
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
      }}
    >
      <StyledInput
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        maxLength={maxInputLength}
        sx={{
          fontSize: 16,
          color: 'text.primary',
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
