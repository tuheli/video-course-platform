import { ItemWithOrderIndex } from './utils';

export interface DraggableProps {
  dataId: string;
  allowedDropzoneTag: string;
  children: React.ReactNode;
  changeOrder: (newOrder: ItemWithOrderIndex[]) => void;
}
