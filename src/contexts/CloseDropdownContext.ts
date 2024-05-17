import { createContext } from 'react';

interface CloseDropdownContextProps {
  isDropdownOpen: boolean;
  closeMainDropdown: () => void;
}

const defaultValue = {
  isDropdownOpen: false,
  closeMainDropdown: () => {},
};

export const CloseDropdownContext =
  createContext<CloseDropdownContextProps>(defaultValue);
