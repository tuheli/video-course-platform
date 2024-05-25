import { Box, Typography, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

interface TextInputProps {
  placeholder: string;
  name: string;
  type?: string;
  validator?: TextInputValidator;
}

interface TextInputValidator {
  validate: (value: string) => boolean;
  invalidMessage: string;
  forceShowValidator: boolean;
}

export const TextInput = ({
  placeholder,
  name,
  validator,
  type = 'text',
}: TextInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const putPlaceholderOnTop = isInputFocused || inputValue !== '';

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const showValidatorText =
    validator !== undefined &&
    (validator.forceShowValidator || inputValue !== '')
      ? validator.validate(inputValue)
      : true;

  const showCheckIcon =
    validator !== undefined &&
    inputValue !== '' &&
    validator.validate(inputValue);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          border: '1px solid',
          borderColor: 'text.primary',
        }}
      >
        <StyledInput
          type={type}
          name={name}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={onChangeInput}
          sx={{
            pt: 3,
            pb: 1,
            pl: 1,
          }}
        />
        <Box>
          <StyledLabel
            htmlFor="text-input"
            sx={{
              position: 'absolute',
              top: putPlaceholderOnTop ? 0 : '50%',
              left: 8,
              transform: putPlaceholderOnTop
                ? 'translate(-3%, 20%)'
                : 'translate(0, -50%)',
              fontSize: putPlaceholderOnTop ? 12 : 14,
              fontWeight: 500,
              pointerEvents: 'none',
            }}
          >
            {placeholder}
          </StyledLabel>
        </Box>
        {showCheckIcon && (
          <Box>
            <CheckIcon
              sx={{
                color: 'success.main',
              }}
            />
          </Box>
        )}
      </Box>
      {!showValidatorText && (
        <Typography
          variant="caption"
          sx={{
            color: 'error.main',
          }}
        >
          {validator?.invalidMessage}
        </Typography>
      )}
    </Box>
  );
};

export const StyledInput = styled('input')(() => ({
  border: 'none',
  outline: 'none',
  backgroundColor: 'white',
  width: '100%',
  height: '100%',
}));

const StyledLabel = styled('label')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  color: 'black',
  transition: 'all 0.2s',
}));
