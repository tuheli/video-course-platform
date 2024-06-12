import { styled } from '@mui/system';
import {
  containerBorderColor,
  containerBorderStyle,
  containerBorderWidth,
  containerColor,
  listWidth,
} from './common';

export const StyledMenuItemsList = styled('ul')({
  backgroundColor: containerColor,
  borderColor: containerBorderColor,
  borderWidth: containerBorderWidth,
  borderStyle: containerBorderStyle,
  listStyleType: 'none',
  position: 'absolute',
  height: 360,
  width: listWidth,
  padding: 0,
  margin: 0,
  zIndex: 1,
});
