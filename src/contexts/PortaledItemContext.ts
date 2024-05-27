import { createContext } from 'react';
import { RenderPosition } from '../components/portaled-item/positioningUtilities';

interface PortaledItemContextType {
  renderPosition: RenderPosition | undefined;
}

const defaultValue: PortaledItemContextType = {
  renderPosition: undefined,
};

export const PortaledItemContext =
  createContext<PortaledItemContextType>(defaultValue);
