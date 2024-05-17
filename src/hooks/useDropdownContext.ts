import { useContext } from 'react';
import { CloseDropdownContext } from '../contexts/CloseDropdownContext';

export const useDropdownContext = () => {
  const { isDropdownOpen, closeMainDropdown } =
    useContext(CloseDropdownContext);

  return { isDropdownOpen, closeMainDropdown };
};
