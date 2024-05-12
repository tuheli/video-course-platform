import { styled } from '@mui/system';
import { Box } from '@mui/material';
import {
  containerBorderColor,
  containerBorderWidth,
  transparentPaddingTop,
  mainDropdownOpenerHeight,
} from './common';

export const StyledTransparencyBox = styled(Box)({
  backgroundColor: 'transparent',
  borderColor: containerBorderColor,
  borderWidth: containerBorderWidth,
  position: 'absolute',
  margin: 0,
  padding: 0,
  paddingTop: transparentPaddingTop,
  top: mainDropdownOpenerHeight,
});
