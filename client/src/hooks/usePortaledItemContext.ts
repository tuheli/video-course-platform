import { useContext } from 'react';
import { PortaledItemContext } from '../contexts/PortaledItemContext';

export const usePortaledItemContext = () => {
  const context = useContext(PortaledItemContext);
  return context;
};
