import { useContext } from 'react';
import { CloseMainDropdownContext } from '../contexts/CloseMainDropdownContext';

export const useClosePopover = () => {
  const closePopover = useContext(CloseMainDropdownContext);
  return closePopover;
};
