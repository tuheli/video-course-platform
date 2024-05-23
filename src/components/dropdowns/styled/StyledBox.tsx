import { styled } from '@mui/system';
import { Box } from '@mui/material';
import {
  containerBorderColor,
  containerBorderWidth,
  containerBorderStyle,
} from './common';

export const StyledBox = styled(Box)({
  backgroundColor: 'white',
  borderColor: containerBorderColor,
  borderWidth: containerBorderWidth,
  borderStyle: containerBorderStyle,
  animation: 'fadeIn 0.2s',
});
