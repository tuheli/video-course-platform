import { createContext } from 'react';

const defaultValue = () => {};

export const CloseMainDropdownContext = createContext<() => void>(defaultValue);
